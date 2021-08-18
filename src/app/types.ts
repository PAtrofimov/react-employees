export interface ServerResponse {
  success: boolean,
  message: string,
  fails?: { name?: string[], email?: string[], phone?: string[], position_id?: string[], photo?: string }
}

export interface Position {
   id: string,
   name: string
 }

 export interface User {
   id?: number,
   name: string,
   email: string,
   phone: string,
   position?: string,
   position_id: number,
   registration_timestamp?: string,
   photo: string
 }

 export interface UsersState {
   users: User[];
   next_url: string | null,
   status: 'idle' | 'loading' | 'failed',
   currentUser: User | null
 }
