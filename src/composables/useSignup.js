import { ref } from "vue";

import { auth } from "../firebase/config";
import { updateProfile } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
const isPending = ref(false);

const signup = async (nickname, email, password) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (!res) {
      throw new Error("Could not complete signup");
    }

    await updateProfile(auth.currentUser, {
      displayName: nickname,
    });

    console.log("CURENT USER", auth.currentUser);
    error.value = null;
    isPending.value = false;

    return res;
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, isPending, signup };
};

export default useSignup;
