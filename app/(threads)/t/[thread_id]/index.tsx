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

import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import { getCurrentProfile, getThread, Profile, Thread } from "@/lib/api";
import PostList from "@/components/PostList";
import { Text, View } from "react-native";
import { tokenStorage } from "@/lib/state";
import { Link, useLocalSearchParams, useRouter } from "expo-router";
import ThreadComp from "@/components/ThreadDisplay";

export default function ThreadView() {
  const localParams = useLocalSearchParams();
  const thread_id = localParams.thread_id as string;
  const [threads, setThreads] = useState<Thread[]>([]);
  const [parentThread, setParentThread] = useState<Thread | null>(null);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [currentProfile, setCurrentProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    getThread(thread_id)
      .then((thread) => {
        setParentThread(thread);
        setThreads([...thread.children]);
        const profs = [];
        if (thread.profile) {
          profs.push(thread.profile);
        }
        thread.children.forEach((t) => {
          if (t.profile) {
            profs.push(t.profile);
          }
        });
        setProfiles([...profiles, ...profs]);
      })
      .catch((reason) => {
        console.error(reason);
        router.push("..");
      });

    if (tokenStorage.contains("token")) {
      getCurrentProfile()
        .then((profile) => {
          setCurrentProfile(profile);
        })
        .catch(() => tokenStorage.delete("token"));
    }
  }, []);

  return (
    <View
      className={
        "flex flex-row justify-center min-w-full h-screen m-auto bg-not-quite-dark-blue gap-4 overflow-y-auto"
      }
    >
      <Sidebar />
      <View className="pt-9">
        {parentThread && <ThreadComp item={parentThread} profiles={profiles} />}
        <Link href={`/t/${thread_id}/reply`}>
          <View className="w-full flex justify-start items-start my-4 p-3 rounded-md scale-105 bg-quite-lighter-dark-blue">
            <Text className="text-white/70 font-main">Write your reply...</Text>
          </View>
        </Link>
        <PostList
          threads={threads.sort(
            (a, b) => b.post.indexed_ts - a.post.indexed_ts,
          )}
          profiles={profiles}
        />
      </View>
    </View>
  );
}