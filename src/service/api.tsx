import Message from "../lib/Message";

let lastMessageID = 1;

let MessagesDataBase: Message[] = [
  {
    id: lastMessageID++,
    user: "Emmanuel Macron",
    content: "On recrute ! Ψ(HyirpmPL43I)Ψ",
    private: false,
    replies: [],
  },
  {
    id: lastMessageID++,
    user: "François Hollande",
    content:
      "ça va, c'est pas trop dure en ce moment avec la crise sanitaire ?",
    private: false,
    replies: [
      {
        id: lastMessageID++,
        user: "Emmanuel Macron",
        content: "si, un peu...",
        private: true,
        replies: [],
      },
    ],
  },
  {
    id: lastMessageID++,
    user: "Nicolas Sarkozy",
    content: "ça va ?",
    private: false,
    replies: [
      {
        id: lastMessageID++,
        user: "Emmanuel Macron",
        content: "oui, oui ça va",
        private: true,
        replies: [],
      },
    ],
  },
];

function findAndPushNewMessage(
  messages: Message[],
  messageToAdd: Message,
  targetId: number
) {
  for (let message of messages) {
    if (message.id === targetId) {
      message.replies.push(messageToAdd);
      return true;
    }
    if (
      message.replies.length &&
      findAndPushNewMessage(message.replies, messageToAdd, targetId)
    ) {
      return true;
    }
  }
  return false;
}

function addMessageSimulation(
  MessagesDataBase: Message[],
  messageToAdd: Message,
  targetId: number = 0
): Message {
  messageToAdd.id = lastMessageID++;
  if (targetId === 0) {
    MessagesDataBase.unshift(messageToAdd);
  } else {
    findAndPushNewMessage(MessagesDataBase, messageToAdd, targetId);
  }
  return messageToAdd;
}

export async function getMessages(): Promise<Message[]> {
  /* fetch GET Messages */
  /* Simulation - with random reject, when 0 number > 8 and 0 < number < 10 */
  if (Math.floor(Math.random() * 10) > 8) {
    return Promise.reject(new Error("Something went wrong 😖"));
  } else {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(JSON.parse(JSON.stringify(MessagesDataBase)));
      }, 2000);
    });
  }
}

export async function addMessage(
  message: Message,
  id: number = 0
): Promise<Message> {
  /* fetch POST Message with id of the message to reply */
  /* Simulation - with random reject, when 0 number > 8 and 0 < number < 10  */
  if (Math.floor(Math.random() * 10) <= 8) {
    try {
      const newMessage = addMessageSimulation(MessagesDataBase, message, id);
      return Promise.resolve(JSON.parse(JSON.stringify(newMessage)));
    } catch {
      return Promise.reject(new Error("Something went wrong 😖"));
    }
  }
  return Promise.reject(new Error("Something went wrong 😖"));
}
