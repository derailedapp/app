/*
   Copyright 2024 V.J. De Chico

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

export const createUser = async (email: string, username: string, password: string) => {
    const resp = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/register", {
        method: "POST",
        body: JSON.stringify({
            email,
            username,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await resp.json();
    return [data.token, data.user];
}

export const userLogin = async (email: string, password: string) => {
    const resp = await fetch(process.env.EXPO_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        body: JSON.stringify({
            email,
            password
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const data = await resp.json();
    return [data.token, data.user];
}

export const scrollExc = async (exclude: string[]): Promise<Post[]> => {
    const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/posts/scroll");
    if (exclude.length > 0) {
        const params = new URLSearchParams();
        var ex = exclude.join("&");
        if (exclude.length === 1) {
            ex += "&";
        }
        params.append("exclude", ex);
        url.search = params.toString();
    }

    const resp = await fetch(url, {
        method: "GET",
    });

    return await resp.json();
}

export const getProfile = async (user_id: string): Promise<Profile> => {
    const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/users/" + user_id);
    const resp = await fetch(url, {
        method: "GET",
    });

    return await resp.json();
}

export const getCurrentProfile = async (): Promise<Profile> => {
    const url = new URL(process.env.EXPO_PUBLIC_API_URL + "/users/@me");
    const resp = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": localStorage.getItem("token")!
        }
    });

    return await resp.json();
}

export interface Actor {
    id: string,
    handle: string | null,
    display_name: string | null,
    bio: string | null,
    status: string | null,
    public_key: string
}

export interface Post {
    id: string,
    type: number,
    author_id: string | null,
    content: string,
    original_ts: number,
    indexed_ts: number,
    parent_id: string | null,
    signature: string
}

export interface Profile {
    actor: Actor,
    followed: number,
    following: number,
    posts: number
}
