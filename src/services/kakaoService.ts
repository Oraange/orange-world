import { supabase } from "../lib/supabaseClient";

export const handleKakaoLogin = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        redirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      console.error("카카오 로그인 오류:", error);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }

    return data;
  } catch (error) {
    console.error("카카오 로그인 오류:", error);
    alert("로그인에 실패했습니다. 다시 시도해주세요.");
  }
};

export const handleKakaoLogout = async () => {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("로그아웃 오류:", error);
    alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    return false;
  }
};
