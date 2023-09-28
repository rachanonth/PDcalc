import React, { useState } from 'react';

const EmojiList = () => {
  const emojis = ['❶ ', '❷', '❸', '❹', '❺', '❻', '❼', '❽', '❾', '⓿', '🏛️', '🚧', '⚠️', '⛔', '📕', '🌟', '✔️', '✅', '❌', '🎖️', '🔖', '📌', '📆'];
  const [copiedEmoji, setCopiedEmoji] = useState('');

  const copyEmoji = (emoji) => {
    navigator.clipboard.writeText(emoji);
    setCopiedEmoji(emoji);
  };

  // Calculate the midpoint index to split emojis into two columns
  const midpoint = Math.ceil(emojis.length / 2);

  return (
    <div>
      <h1>Emoji List</h1>
      <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <div>
          {emojis.slice(0, midpoint).map((emoji, index) => (
            <div key={index}>
              <span>{emoji}</span>
              <button onClick={() => copyEmoji(emoji)}>Copy</button>
            </div>
          ))}
        </div>
        <div>
          {emojis.slice(midpoint).map((emoji, index) => (
            <div key={index}>
              <span>{emoji}</span>
              <button onClick={() => copyEmoji(emoji)}>Copy</button>
            </div>
          ))}
        </div>
      </div>
      {copiedEmoji && <p>Copied: {copiedEmoji}</p>}
    </div>
  );
};

export default EmojiList;
