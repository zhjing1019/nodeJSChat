import User from './user'

class Message {
  private from: User;
  private content: string
  private type: string
  constructor(type: string, from: User, content: string) {
    this.type = type
    this.from = from
    this.content = content
  }
}
export default Message