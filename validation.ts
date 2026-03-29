export interface UserRegistrationInput {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
}

export function validateUserRegistration(
  input: UserRegistrationInput,
): ValidationResult {
  const errors: Record<string, string[]> = {};

  // ユーザー名バリデーション
  if (!input.username || input.username.trim().length === 0) {
    (errors.username ??= []).push("ユーザー名は必須です");
  } else {
    const username = input.username.trim();
    if (username.length < 3 || username.length > 30) {
      (errors.username ??= []).push("ユーザー名は3〜30文字で入力してください");
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      (errors.username ??= []).push(
        "ユーザー名は英数字、ハイフン、アンダースコアのみ使用できます",
      );
    }
  }

  // メールアドレスバリデーション
  if (!input.email || input.email.trim().length === 0) {
    (errors.email ??= []).push("メールアドレスは必須です");
  } else {
    const emailPattern =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailPattern.test(input.email.trim())) {
      (errors.email ??= []).push("有効なメールアドレスを入力してください");
    }
    if (input.email.trim().length > 254) {
      (errors.email ??= []).push(
        "メールアドレスは254文字以内で入力してください",
      );
    }
  }

  // パスワードバリデーション
  if (!input.password || input.password.length === 0) {
    (errors.password ??= []).push("パスワードは必須です");
  } else {
    if (input.password.length < 8) {
      (errors.password ??= []).push("パスワードは8文字以上で入力してください");
    }
    if (input.password.length > 128) {
      (errors.password ??= []).push(
        "パスワードは128文字以内で入力してください",
      );
    }
    if (!/[A-Z]/.test(input.password)) {
      (errors.password ??= []).push("大文字を1文字以上含めてください");
    }
    if (!/[a-z]/.test(input.password)) {
      (errors.password ??= []).push("小文字を1文字以上含めてください");
    }
    if (!/[0-9]/.test(input.password)) {
      (errors.password ??= []).push("数字を1文字以上含めてください");
    }
    if (!/[^a-zA-Z0-9]/.test(input.password)) {
      (errors.password ??= []).push("記号を1文字以上含めてください");
    }
  }

  // パスワード確認バリデーション
  if (!input.confirmPassword || input.confirmPassword.length === 0) {
    (errors.confirmPassword ??= []).push("パスワード（確認）は必須です");
  } else if (input.password !== input.confirmPassword) {
    (errors.confirmPassword ??= []).push("パスワードが一致しません");
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
