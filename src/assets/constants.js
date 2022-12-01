// word recite status
export const STATUS = {
  DEFAULT: 0,
  CORRECT: 1,
  INCORRECT: 2,
  LOSER: 3,
  CLOSER: 4,
};

export const defaultWord = "abandon";
export const defaultTranslate = ["放弃", "遗弃", "抛弃", "舍弃", "丢弃"];

export const EnglishRegExp = /[a-zA-Z\-]+/;
export const ChineseRegExp = /[;,:；，。：、\/\\]+/g;

export const chineseRule = {
  validator: (value, cb) =>
    new Promise((resolve) => {
      if (!value.length) {
        cb("中文不能为空。");
      }
      resolve();
    }),
};

export const i18nMap = {
  "increase-word": ["增加新单词", "Increase word"],
  "edit-word": ["编辑单词", "Edit word"],
  "delete-word": ["删除单词", "Delete word"],
  settings: ["设置", "Settings"],
  "store-number": ["单词总数", "Total words"],
  "review-number": ["复习数量", "Review number"],
  "translation-number": ["翻译数量", "Minimum of translation"],
  "random-single-zh": ["随机单个翻译", "Random single translation"],
  "listening-mode": ["听力模式", "Listening mode"],
  "review-number-validator": [
    "复习数量不能小于 1。",
    "Review number can't less than 1.",
  ],
  refresh: ["刷新", "Refresh"],
  "accuracy": ["正确率：", "Current accuracy: "],
  "export-words": ["导出单词", "Export words"],
  "import-words": ["导入单词", "Import words"],
  confirm: ["确定", "Confirm"],
  cancel: ["取消", "Cancel"],
  "translate-placeholder": ["翻译", "Translate it"],
  "delete-prompt": [
    "确定删除单词吗？",
    "Are you sure you want to delete the word?",
  ],
  "increase-notification": ["增加成功。", "Increase succeeded."],
  "edit-notification": ["编辑成功。", "Edit succeeded."],
  "delete-notification": ["删除成功。", "Delete succeeded."],
  "setting-notification": ["设置成功。", "Setting succeeded."],
  cheat: ["我是废物，我要看答案", "I'm LOSER and view the answer"],
  github: ["在 GitHub 上查看源代码", "View it on GitHub"],
  congratulation: ["恭喜你！你做到了！", "Congratulations! You did it!"],
  encouragement: ["还不错！继续加油！", "Not bad! Keep going!"],
  attention: ["不在状态呢，要小心了！", "Oops, you need to pay attention!"],
  trash: ["回家吧你个废物", "Go home you TRASH"],
  "empty-text": [
    "没有单词，请添加单词或刷新。",
    "No words, please increase word or refresh.",
  ],
};
