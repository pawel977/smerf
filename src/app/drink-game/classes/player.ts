export class Player {
  public nick: string = '';
  public imgUrl: string =
    'https://img.freepik.com/free-icon/user_318-928371.jpg?t=st=1678231280~exp=1678231880~hmac=f21655b3f05fe53d1e7b4e629447578b63bfdb4411e7c61b6f49f72a8844d70c';
  private wypiteKieliszki: number = 0;
  private polaneKieliszki: number = 0;
  private ominieteKolejki: number = 0;

  private czyWciazPije: boolean = true;
  constructor(params: Partial<Player>) {
    Object.assign(this, params);
  }

  incrementWypiteKieliszki(number: number = 1) {
    this.wypiteKieliszki += number;
  }

  getWypiteKieliszki(): number {
    return this.polaneKieliszki;
  }

  incrementPolaneKieliszki(number: number = 1) {
    this.polaneKieliszki += number;
  }

  getPolaneKieliszki(): number {
    return this.polaneKieliszki;
  }

  inctementOminieteKolejki(number: number = 1) {
    this.ominieteKolejki += number;
  }

  getOminieteKieliszki(): number {
    return this.ominieteKolejki;
  }

  setCzyWciazPije(isDrinking: boolean) {
    this.czyWciazPije = isDrinking;
  }

  getCzyWciazPije() {
    return this.czyWciazPije;
  }

  getNick(): string {
    return this.nick;
  }
  setImg(url: string) {
    this.imgUrl = url;
  }
  getImg(): string {
    return this.imgUrl;
  }
}
