class User {
  private name: string
  private id: string
  private avatar: string
  constructor(id: string, name: string, avatar: string) {
    this.name = name
    this.id = id
    this.avatar = avatar
  }
}
export default User