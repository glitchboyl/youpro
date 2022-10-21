// word recite status
export const STATUS = {
  DEFAULT: 0,
  TRUE: 1,
  FALSE: 2,
  LOSER: 3,
};

export const defaultWord = "abandon";
export const defaultTranslate = ["放弃", "遗弃", "抛弃", "舍弃", "丢弃"];

export const EnglishRegExp = /[a-zA-Z\-]+/;

export const i18nMap = {
  "increase-word": ["增加新单词", "Increase word"],
  "edit-word": ["编辑单词", "Edit word"],
  "delete-word": ["删除单词", "Delete word"],
  settings: ["设置", "Settings"],
  "review-number": ["复习数量", "Review number"],
  refresh: ["刷新", "Refresh"],
  "current-progress": ["当前进度：", "Current progress: "],
  "export-words": ["导出单词", "Export words"],
  "import-words": ["导入单词", "Import words"],
  confirm: ["确定", "Confirm"],
  cancel: ["取消", "Cancel"],
  "translate-placeholder": ["翻译", "Translate it"],
  "delete-prompt": [
    "确定删除单词吗？",
    "Are you sure you want to delete the word?",
  ],
  "increase-notification": ["增加成功。", "Increase successed."],
  "edit-notification": ["编辑成功。", "Edit successed."],
  "delete-notification": ["删除成功。", "Delete successed."],
  cheat: ["我是废物，我要看答案", "I'm LOSER and view the answer"],
  github: ["在 GitHub 上查看源代码", "View it on GitHub"],
  "empty-text": [
    "没有单词，请添加单词或刷新。",
    "No words, please increase word or refresh.",
  ],
};
