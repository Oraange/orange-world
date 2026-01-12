import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { supabase } from "../../lib/supabaseClient";
import type { User, AuthChangeEvent, Session } from "@supabase/supabase-js";
import { handleKakaoLogout } from "@/services/kakaoService";

interface AuthContextType {
  user: User | null;
  nickname: string;
  profileImgPath: string;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [nickname, setNickname] = useState<string>("");
  const [profileImgPath, setProfileImgPath] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 현재 사용자 세션 확인
    const checkUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);

        if (user) {
          // 카카오 사용자 메타데이터에서 닉네임 추출
          const userMetadata = user.user_metadata;
          const kakaoNickname =
            userMetadata?.name ||
            userMetadata?.full_name ||
            userMetadata?.nickname ||
            "사용자";
          setNickname(kakaoNickname);
          const profileImgPath =
            userMetadata?.avatar_url || userMetadata?.picture || "";
          setProfileImgPath(profileImgPath);
          console.log("사용자 정보: ", user);
        }
      } catch (error) {
        console.error("사용자 세션 확인 오류:", error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // 인증 상태 변경 리스너
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUser(session?.user ?? null);

        if (session?.user) {
          const userMetadata = session.user.user_metadata;
          const kakaoNickname =
            userMetadata?.name ||
            userMetadata?.full_name ||
            userMetadata?.nickname ||
            "사용자";
          setNickname(kakaoNickname);
          const profileImgPath =
            userMetadata?.avatar_url || userMetadata?.picture || "";
          setProfileImgPath(profileImgPath);
        } else {
          setNickname("");
          setProfileImgPath("");
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    try {
      const isSignOut = await handleKakaoLogout();
      if (!isSignOut) throw new Error("로그아웃에 실패했습니다.");
      // const { error } = await supabase.auth.signOut();
      //
      setUser(null);
      setNickname("");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, nickname, profileImgPath, loading, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
