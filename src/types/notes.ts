export interface NoteRequest {
  title: string;
  content: string;
  type: string;
}

export interface NoteResponse {
  _id: string;
  title: string;
  content: string;
  type: string;
  created_at: string;
}
