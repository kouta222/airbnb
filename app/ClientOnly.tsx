"use client";

import { useEffect, useState } from "react";

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return hasMounted && <>{children}</>;
};

export default ClientOnly;

/* ClientOnlyコンポーネントは、SSR（サーバーサイドレンダリング）やSSG（静的サイト生成）を使用しているフレームワーク（例：Next.js）で、クライアントサイドのみでレンダリングする必要がある特定のコンポーネントやロジックを扱う際に非常に便利
 */
