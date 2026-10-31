import { Plugin } from '@opencode/plugin';
import { spawn } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const directory = dirname(fileURLToPath(import.meta.url));
const text = {type:'string'};
const properties = {
  prompt:{...text,description:'Image-generation or follow-up editing prompt. Sent to Gemini in the authorised browser.'},
  chat_url:{...text,description:'Optional existing Gemini chat URL for character/style continuity. Omit for a new chat.'},
  output_dir:{...text,description:'Absolute directory in which to save original generated images.'},
  prefix:{...text,description:'Output filename stem, using letters, numbers, hyphens or underscores.'},
  response_index:{type:'integer',minimum:0,description:'Index returned by submit; required by collect.'},
  timeout_seconds:{type:'integer',minimum:10,maximum:600,description:'Generation wait, default 240. Timeout returns a recoverable receipt.'},
};

export default Plugin.define({
  id:'browser-image-generation',
  async setup(ctx) {
    // Host bindings contain executable paths only, never account credentials.
    const invoke=async (action,input,context)=>{
      const host=JSON.parse(await readFile(join(directory,'host.json'),'utf8'));
      return new Promise((resolve,reject)=>{
      const child=spawn(host.python,[join(directory,'browser_images.py')],{stdio:['pipe','pipe','pipe'],signal:context.signal});
      let output='',errors='';
      child.stdout.on('data',chunk=>{output+=chunk;});
      child.stderr.on('data',chunk=>{errors+=chunk;});
      child.on('error',reject);
      child.on('close',code=>{
        // Python's structured errors are preferred over dependency log noise.
        if(output.trim()) resolve({content:output.trim()});
        else reject(new Error(`Image browser exited ${code}: ${errors.slice(-1200)}`));
      });
      child.stdin.end(JSON.stringify({...input,action,cdp_url:host.cdp_url}));
      });
    };
    await ctx.tool.transform(editor=>{
      editor.namespace({name:'images',description:'Generate images with the existing Gemini web subscription through an authorised local browser, and save full-resolution originals.'});
      for(const [name,description,keys,required] of [
        ['status','Check the local browser connection for image generation. Does not submit a prompt or read unrelated chats.',[],[]],
        ['generate','Generate and download Gemini images. Uses the existing signed-in subscription. Omit chat_url for a new chat; supply it for iterative editing and visual continuity. Returns output files or a recoverable response receipt.',['prompt','chat_url','output_dir','prefix','timeout_seconds'],['prompt','output_dir']],
        ['submit','Start an image request without waiting. Returns chat_url and response_index. Call collect for results; do not resubmit a pending request.',['prompt','chat_url'],['prompt']],
        ['collect','Wait for and download original images from a previously submitted request. Does not submit another generation.',['chat_url','response_index','output_dir','prefix','timeout_seconds'],['chat_url','response_index','output_dir']],
      ]) editor.add({name,description,input:{type:'object',properties:Object.fromEntries(keys.map(k=>[k,properties[k]])),required,additionalProperties:false},options:{namespace:'images',codemode:true},execute:(input,context)=>invoke(name,input,context)});
    });
  },
});
