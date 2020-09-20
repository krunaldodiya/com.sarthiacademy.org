export const checkSimulator = async (NativeModules: any, callback: any) => {
  var utils = await NativeModules.Utils;

  await utils.isSimEmu(
    async (err) => {
      callback(err.res);
    },
    async (res) => {
      callback(res);
    },
  );
};
