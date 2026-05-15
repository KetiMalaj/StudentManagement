import {jwtVerify, SignJWT} from 'jose'

export const getJwtSecretKey = () => {
    const secret = process.env.SECRET_KEY;
    if (!secret) throw new Error("SECRET_KEY is not set");
    return new TextEncoder().encode(secret);
  };

  export const signToken = async (payload: { email: string; id: number; role: string }) => {
    return new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("24h")
      .sign(getJwtSecretKey());
  };

  export const verifyAuth = async (token: string) => {
    try {
      const { payload } = await jwtVerify(token, getJwtSecretKey());
      return payload;
    } catch {
      return null;
    }
  };
