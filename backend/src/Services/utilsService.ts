export default class UtilsSerivce {
  public static stripUndefined = <T>(query: T) => JSON.parse(JSON.stringify(query));
}
