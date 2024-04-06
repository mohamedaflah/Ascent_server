export type VideoCallPayload = {
  callId: string;
  recieverId: string;
  senderId: string;
  message: string;
  senderName: string;
  senderProfile: string;
};

export type VideoCallDecline = {
  callId: string;
  senderId: string;
  senderProfile: string;
  message: string;
  senderName: string;
  reciverId: string;
};
