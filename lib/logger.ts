class Logger {
  constructor() {}

  log(data: any) {
    console.group("====================Logger====================");
    console.log(JSON.stringify(data, null, 2));
    console.groupEnd();
  }
}

export default new Logger();
