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

// S: threads

import { Link } from "expo-router";
import { View } from "react-native";
import Octicons from "@expo/vector-icons/Octicons";
import { tokenStorage } from "@/lib/state";

export default function Sidebar() {
  return (
    <View className="hidden lg:flex flex-col items-center top-0 justify-center fixed left-0 w-[69px] h-screen gap-4 ml-4 overflow-y-auto">
      <Link href="/">
        <View className="flex flex-row justify-center p-4 gap-3 hover:bg-primary ease-in-out transition duration-500 rounded-xl">
          <Octicons name="home" size={25} color="white" />
        </View>
      </Link>
      <Link href="/@me">
        <View className="flex flex-row justify-center p-4 gap-3 hover:bg-primary ease-in-out transition duration-500 rounded-xl">
          <Octicons name="feed-person" size={25} color="white" />
        </View>
      </Link>
      {tokenStorage.contains("token") && (
        <Link href="/post">
          <View className="flex flex-row justify-center p-4 gap-3 bg-brand hover:bg-brand-dark ease-in-out transition duration-500 rounded-xl">
            <Octicons name="pencil" size={25} color="white" />
          </View>
        </Link>
      )}
      {!tokenStorage.contains("token") && (
        <Link href="/login">
          <View className="flex flex-row justify-center p-4 gap-3 bg-brand hover:bg-brand-dark ease-in-out transition duration-500 rounded-xl">
            <Octicons name="sign-in" size={25} color="white" />
          </View>
        </Link>
      )}
    </View>
  );
}
