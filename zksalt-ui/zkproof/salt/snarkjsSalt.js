import { exportCallDataGroth16 } from "../snarkjsZkproof";

export async function saltCalldata(a,b,c) {
  const input = {
    a: a,
    b: b,
    c: c,
  };

  let dataResult;

  try {
    dataResult = await exportCallDataGroth16(
      input,
      "/zkproof/salt.wasm",
      "/zkproof/salt_final.zkey"
    );
  } catch (error) {
    // console.log(error);
    window.alert("Wrong answer");
  }

  return dataResult;
}
