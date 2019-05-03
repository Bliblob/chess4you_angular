export class MessageData {
    Message: String;
    isSuccess: Boolean;
    constructor(Message: String, isSuccess: Boolean) {
      this.Message = Message;
      this.isSuccess = isSuccess;
    }
}
