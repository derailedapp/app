import { createPost } from "@/lib/api";
import { tokenStorage } from "@/lib/state";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";

export default function PostModal() {
  const [postContent, setPostContent] = useState("");

  const router = useRouter();

  const post = () => {
    createPost(postContent)
      .then(() => {
        router.push("/global");
        router.reload();
      })
      .catch((err) => console.error(err));
  };

  return (
    <View className="flex-1 justify-center items-center bg-transparent backdrop-blur-sm backdrop-opacity-95 backdrop-brightness-50">
      <View className="bg-not-quite-dark-blue  p-4 gap-10 rounded-md min-w-80">
        <View className="flex flex-row justify-between">
          <Link href="../">
            <Text className="text-blue-400 font-main">Cancel</Text>
          </Link>
          <Pressable onPress={post}>
            <View className="p-3 rounded-md">
              <Text className="text-brand font-main">Post</Text>
            </View>
          </Pressable>
        </View>
        <View className="flex flex-row items-center min-w-80">
          <TextInput
            multiline
            onChangeText={(text) => setPostContent(text)}
            value={postContent}
            placeholder="So, have I some news for you..."
            className="placeholder:text-gray-400 text-white font-main h-40 min-w-80 text-xl"
          />
        </View>
      </View>
    </View>
  );
}
