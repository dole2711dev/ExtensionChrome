// -------------------------- CONSTANTS SYMBOL --------------------------
const PREFIX_CONTENT = "■";
const SEPARATE_CHARACTER = "------------------------------------------";

// -------------------------- CONSTANTS --------------------------
const STYLE_DISPLAY_NONE = "none";
const STYLE_DISPLAY_BLOCK = "block";
const STYLE_HEIGHT_CHAT_TEXT_DEFAULT = 121;
const idChatText = "_chatText";
const idChatSendArea = "_chatSendArea";
const LIST_ITEM_SEPARATE = ["Send"];
const TYPE_ADD_TO = "to";
const TYPE_ADD_CC = "cc";

const snippetsTemplate = {
	Estimate: {
		title: "[Estimate]",
		contents: [
			"Project",
			"Task",
			"Process",
			"Redmine",
			"File",
			"Sheet",
			"Start",
			"End",
			"Total",
		],
		end: "Thanks!",
	},
	"Estimate-QC": {
		title: "[Estimate]",
		contents: [
			"Project",
			"Task",
			"Process",
			"Redmine",
			"File",
			"Start",
			"End",
			"Total",
		],
		advanced: {
			File: ["Total case", "Setup risk", "Get EVD"],
		},

		end: "Thanks!",
	},
	Delay: {
		title: "[Delayed]",
		contents: [
			"Project",
			"Task",
			"Process",
			"Redmine",
			"Remain (H)",
			"% Completed",
			"Re-Estimate",
			"Reason",
			"Temp Result",
		],
		advanced: {
			"Re-Estimate": [
				"Start (Date & Time)",
				"End (Date & Time)",
				"Spent time",
				"Time",
				"Total (H)",
			],
			"Temp Result": ["Account", "Shelve"],
		},

		end: "Thanks!",
	},
	"Re-start": {
		title: "[Re-start]",
		contents: [
			"Project",
			"Task",
			"Process",
			"Redmine",
			"Remain (H)",
			"Re-Start (Time)",
			"End (Date & Time)",
		],
		end: "Thanks!",
	},
	Pending: {
		title: "[Pending]",
		contents: [
			"Project",
			"Task",
			"Process",
			"Redmine",
			"% Completed",
			"Remain",
			"Reasons",
		],
		end: "Thanks!",
	},
	Done: {
		title: "[Done Task]",
		contents: [
			"Project",
			"Task",
			"Process",
			"Redmine",
			"Total",
			"Late(H)",
			"Result",
		],
		advanced: { Result: ["-"] },
		end: "Thanks!",
	},
	Send: {
		title: "Mình gửi bản shelve",
		contents: ["Project", "Task", "Process", "Redmine", "Result"],
		advanced: {
			Result: ["Get latest & Build All", "Account", "Shelve name"],
		},

		end: "Thanks!",
	},
	Report: {
		title: "Báo cáo tình hình task",
		contents: ["Đã làm", "Chưa làm", "Shelve"],
		advanced: {
			"Đã làm": ["-"],
			"Chưa làm": ["-"],
			Shelve: ["-"],
		},

		end: "Thanks!",
	},
	"Check-in": {
		title: "Em đã thực hiện check-in cho task ",
		contents: ["Project", "Changeset", "Comment", "Account", "Shelve"],
		end: "Thanks Anh!",
	},
};

const defautTemplate = {
	Redmine: "None",
	"Get latest & Build All": "[OK]",
	"Late(H)": "H",
	Total: "H",
	"Start (Date & Time)": "H",
	"End (Date & Time)": "H",
	"Re-Start (Time)": "H",
	"Remain (H)": "H",
	Reasons: "ưu tiên task ",
	"% Completed": "%",
	"Setup risk": "H",
	Start: "H",
	End: "H",
};
