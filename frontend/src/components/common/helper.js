export function nestedTree(items, comment_id = null, link = "comment_parent") {
  return items
    .filter((item) => item[link] === comment_id)
    .map((item) => ({ ...item, children: nestedTree(items, item.comment_id) }));
}
