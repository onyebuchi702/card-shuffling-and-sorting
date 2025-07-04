export const formatSortMethod = (method: string | undefined): string => {
  if (!method) return "";

  const methodMap: Record<string, string> = {
    rank_then_suit: "Rank → Suit",
    suit_then_rank: "Suit → Rank",
  };

  return methodMap[method] || method;
};

export const getActionIcon = (action: string): string => {
  const icons: Record<string, string> = {
    shuffled: "🔀",
    sorted: "📊",
    reset: "🔄",
  };
  return icons[action] || "";
};
