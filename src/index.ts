import jwt from '@tsndr/cloudflare-worker-jwt'

export interface Bindings {

  TOKEN_SECRET: string;

}

const getJSON = (data: Object) => {
  return JSON.stringify(data, null, 2);
}

const worker: ExportedHandler<Bindings> = {

  'fetch': async (req: Request, env: Bindings) => {

    const token = await jwt.sign({ username: 'hello' }, env.TOKEN_SECRET);
    
    return new Response(getJSON({
      isSuccess :true,
      message: '회원가입이 성공하였습니다.',
      result: {
        accessToken: token
      }
    }));

  }

}

export default worker;