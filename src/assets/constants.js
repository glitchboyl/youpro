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
  increaseWord: ["增加新单词", "Increase word"],
  editWord: ["编辑单词", "Edit word"],
  deleteWord: ["删除单词", "Delete word"],
  settings: ["设置", "Settings"],
  reviewNumber: ["复习数量", "Review number"],
  refresh: ["刷新", "Refresh"],
  currentProgress: ["当前进度：", "Current progress: "],
  exportWords: ["导出单词", "Export words"],
  importWords: ["导入单词", "Import words"],
  confirm: ["确定", "Confirm"],
  cancel: ["取消", "Cancel"],
  translatePlaceholder: ["翻译", "Translate it"],
  deletePrompt: ["确定删除单词吗？", "Are you sure you want to delete the word?"],
  increaseNotification: ["增加成功。", "Increase successed."],
  editNotification: ["编辑成功。", "Edit successed."],
  deleteNotification: ["删除成功。", "Delete successed."],
  cheat: ["我是废物，我要看答案", "I'm LOSER and view the answer"],
  github: ["在 GitHub 上查看源代码", "View it on GitHub"],
};
