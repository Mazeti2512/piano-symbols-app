import React, { useEffect, useMemo, useState } from 'react';

const symbols = [
  {
    id: 'treble-clef', icon: '𝄞', en: 'Treble Clef', vi: 'Khóa Sol', category: 'Clefs & Staff', level: 1,
    explanationEn: 'The treble clef is used for higher notes. On piano, it usually represents the right hand. Its curl wraps around the G line, so it is also called the G clef.',
    explanationVi: 'Khóa Sol dùng cho các nốt cao hơn. Trên piano, nó thường dành cho tay phải. Phần xoắn của ký hiệu ôm quanh dòng Sol, nên còn gọi là khóa Sol.',
    mistakeEn: 'Do not read treble clef notes the same way as bass clef notes.',
    mistakeVi: 'Đừng đọc nốt ở khóa Sol giống như khóa Fa.'
  },
  {
    id: 'bass-clef', icon: '𝄢', en: 'Bass Clef', vi: 'Khóa Fa', category: 'Clefs & Staff', level: 1,
    explanationEn: 'The bass clef is used for lower notes. On piano, it usually represents the left hand. The two dots sit around the F line, so it is also called the F clef.',
    explanationVi: 'Khóa Fa dùng cho các nốt thấp hơn. Trên piano, nó thường dành cho tay trái. Hai dấu chấm nằm quanh dòng Fa, nên còn gọi là khóa Fa.',
    mistakeEn: 'Do not read bass clef notes using treble clef positions.',
    mistakeVi: 'Đừng đọc nốt khóa Fa bằng vị trí nốt của khóa Sol.'
  },
  {
    id: 'staff', icon: '𝄚', en: 'Staff', vi: 'Khuông nhạc', category: 'Clefs & Staff', level: 1,
    explanationEn: 'The staff has five lines and four spaces. Notes are placed on the lines and spaces to show pitch.',
    explanationVi: 'Khuông nhạc gồm năm dòng và bốn khe. Nốt được đặt trên dòng hoặc khe để thể hiện cao độ.',
    mistakeEn: 'Each line and space has a different note name depending on the clef.',
    mistakeVi: 'Mỗi dòng và khe có tên nốt khác nhau tùy theo khóa nhạc.'
  },
  {
    id: 'quarter-note', icon: '♩', en: 'Quarter Note', vi: 'Nốt đen', category: 'Notes', level: 2,
    explanationEn: 'A quarter note usually receives one beat in 4/4 time.',
    explanationVi: 'Nốt đen thường có giá trị một phách trong nhịp 4/4.',
    mistakeEn: 'Do not rush quarter notes. Count each beat clearly.',
    mistakeVi: 'Đừng đánh nốt đen quá vội. Hãy đếm từng phách rõ ràng.'
  },
  {
    id: 'half-note', icon: '𝅗𝅥', en: 'Half Note', vi: 'Nốt trắng', category: 'Notes', level: 2,
    explanationEn: 'A half note usually receives two beats in 4/4 time. Hold the key down for the full value.',
    explanationVi: 'Nốt trắng thường có giá trị hai phách trong nhịp 4/4. Hãy giữ phím đủ trường độ.',
    mistakeEn: 'Beginners often release half notes too early.',
    mistakeVi: 'Người mới học thường nhả nốt trắng quá sớm.'
  },
  {
    id: 'whole-note', icon: '𝅝', en: 'Whole Note', vi: 'Nốt tròn', category: 'Notes', level: 2,
    explanationEn: 'A whole note usually receives four beats in 4/4 time.',
    explanationVi: 'Nốt tròn thường có giá trị bốn phách trong nhịp 4/4.',
    mistakeEn: 'Keep counting while holding the note.',
    mistakeVi: 'Vẫn phải đếm khi giữ nốt.'
  },
  {
    id: 'quarter-rest', icon: '𝄽', en: 'Quarter Rest', vi: 'Dấu lặng đen', category: 'Rests', level: 2,
    explanationEn: 'A quarter rest means silence for one beat. You do not play, but you still count the beat.',
    explanationVi: 'Dấu lặng đen nghĩa là im lặng trong một phách. Bạn không đánh đàn, nhưng vẫn phải đếm phách.',
    mistakeEn: 'A rest is not empty time. It is counted time.',
    mistakeVi: 'Dấu lặng không phải khoảng trống bỏ qua. Nó vẫn là thời gian cần đếm.'
  },
  {
    id: 'time-signature', icon: '4/4', en: 'Time Signature', vi: 'Số chỉ nhịp', category: 'Rhythm & Time', level: 3,
    explanationEn: 'The time signature tells you how many beats are in each measure and which note value gets one beat.',
    explanationVi: 'Số chỉ nhịp cho biết mỗi ô nhịp có bao nhiêu phách và loại nốt nào được tính là một phách.',
    mistakeEn: 'Do not read 4/4 as a math fraction. It is a rhythm instruction.',
    mistakeVi: 'Đừng đọc 4/4 như phân số toán học. Nó là chỉ dẫn về nhịp.'
  },
  {
    id: 'sharp', icon: '♯', en: 'Sharp', vi: 'Dấu thăng', category: 'Accidentals', level: 4,
    explanationEn: 'A sharp raises a note by one semitone. On piano, this usually means moving to the nearest key on the right.',
    explanationVi: 'Dấu thăng nâng nốt lên nửa cung. Trên piano, thường là đi sang phím gần nhất bên phải.',
    mistakeEn: 'A sharp does not always mean a black key. E sharp is F.',
    mistakeVi: 'Dấu thăng không phải lúc nào cũng là phím đen. Mi thăng là Fa.'
  },
  {
    id: 'flat', icon: '♭', en: 'Flat', vi: 'Dấu giáng', category: 'Accidentals', level: 4,
    explanationEn: 'A flat lowers a note by one semitone. On piano, this usually means moving to the nearest key on the left.',
    explanationVi: 'Dấu giáng hạ nốt xuống nửa cung. Trên piano, thường là đi sang phím gần nhất bên trái.',
    mistakeEn: 'A flat does not always mean a black key. C flat is B.',
    mistakeVi: 'Dấu giáng không phải lúc nào cũng là phím đen. Đô giáng là Si.'
  },
  {
    id: 'natural', icon: '♮', en: 'Natural', vi: 'Dấu bình', category: 'Accidentals', level: 4,
    explanationEn: 'A natural cancels a sharp or flat and returns the note to its normal pitch within the measure.',
    explanationVi: 'Dấu bình hủy dấu thăng hoặc dấu giáng, đưa nốt về cao độ bình thường trong ô nhịp đó.',
    mistakeEn: 'Accidentals usually last until the end of the measure.',
    mistakeVi: 'Dấu hóa bất thường thường có hiệu lực đến hết ô nhịp.'
  },
  {
    id: 'piano-dynamic', icon: 'p', en: 'Piano', vi: 'Nhẹ', category: 'Dynamics', level: 5,
    explanationEn: 'Piano means play softly. It tells you about volume, not the instrument.',
    explanationVi: 'Piano nghĩa là chơi nhẹ. Nó nói về âm lượng, không phải cây đàn piano.',
    mistakeEn: 'In sheet music, p means soft.',
    mistakeVi: 'Trong bản nhạc, p nghĩa là nhẹ.'
  },
  {
    id: 'forte', icon: 'f', en: 'Forte', vi: 'Mạnh', category: 'Dynamics', level: 5,
    explanationEn: 'Forte means play loudly. Use more weight and confidence, but do not bang the keys.',
    explanationVi: 'Forte nghĩa là chơi mạnh. Hãy dùng lực và sự chắc chắn hơn, nhưng không đập phím thô.',
    mistakeEn: 'Loud does not mean harsh. Keep the tone controlled.',
    mistakeVi: 'Mạnh không có nghĩa là thô. Vẫn phải kiểm soát âm thanh.'
  },
  {
    id: 'crescendo', icon: '<', en: 'Crescendo', vi: 'To dần', category: 'Dynamics', level: 5,
    explanationEn: 'Crescendo means gradually get louder. The sound should grow smoothly, not suddenly jump.',
    explanationVi: 'Crescendo nghĩa là chơi to dần. Âm thanh nên lớn lên từ từ, không tăng đột ngột.',
    mistakeEn: 'Do not get loud too early. Save room to grow.',
    mistakeVi: 'Đừng chơi to quá sớm. Hãy chừa khoảng để âm lượng tăng dần.'
  },
  {
    id: 'staccato', icon: '•', en: 'Staccato', vi: 'Nảy, ngắt', category: 'Articulation', level: 6,
    explanationEn: 'Staccato means play the note short and detached. On piano, lift the finger quickly after playing.',
    explanationVi: 'Staccato nghĩa là chơi nốt ngắn và tách rời. Trên piano, hãy nhấc ngón nhanh sau khi đánh.',
    mistakeEn: 'Short does not mean aggressive. Keep the sound clean.',
    mistakeVi: 'Ngắn không có nghĩa là đánh gắt. Hãy giữ âm thanh gọn và sạch.'
  },
  {
    id: 'accent', icon: '>', en: 'Accent', vi: 'Dấu nhấn', category: 'Articulation', level: 6,
    explanationEn: 'An accent means the note should be emphasized more than the surrounding notes.',
    explanationVi: 'Dấu nhấn nghĩa là nốt đó cần được làm nổi bật hơn các nốt xung quanh.',
    mistakeEn: 'Accent is emphasis, not random loudness.',
    mistakeVi: 'Dấu nhấn là sự nhấn mạnh có kiểm soát, không phải tự nhiên đánh thật mạnh.'
  },
  {
    id: 'repeat', icon: '𝄆 𝄇', en: 'Repeat Sign', vi: 'Dấu lặp lại', category: 'Repeats & Navigation', level: 7,
    explanationEn: 'Repeat signs tell you to play a section again. Start from the matching repeat sign or from the beginning if there is no opening repeat.',
    explanationVi: 'Dấu lặp lại yêu cầu bạn chơi lại một đoạn. Hãy quay về dấu lặp mở tương ứng, hoặc quay về đầu bài nếu không có dấu mở.',
    mistakeEn: 'Look carefully for where the repeated section begins.',
    mistakeVi: 'Hãy nhìn kỹ xem đoạn cần lặp bắt đầu từ đâu.'
  },
  {
    id: 'pedal', icon: 'Ped.', en: 'Pedal Mark', vi: 'Dấu pedal', category: 'Piano Marks', level: 8,
    explanationEn: 'Pedal marks tell the pianist when to press and release the sustain pedal. The pedal helps notes ring longer.',
    explanationVi: 'Dấu pedal cho người chơi biết khi nào cần đạp và nhả pedal vang. Pedal giúp âm thanh ngân dài hơn.',
    mistakeEn: 'Too much pedal can make the sound blurry.',
    mistakeVi: 'Dùng quá nhiều pedal có thể làm âm thanh bị nhòe.'
  }
];

const categories = ['All', ...Array.from(new Set(symbols.map((item) => item.category)))];

function filterSymbols(list, activeCategory, query) {
  const cleanQuery = query.trim().toLowerCase();
  return list.filter((symbol) => {
    const matchesCategory = activeCategory === 'All' || symbol.category === activeCategory;
    const matchesQuery =
      !cleanQuery ||
      symbol.en.toLowerCase().includes(cleanQuery) ||
      symbol.vi.toLowerCase().includes(cleanQuery) ||
      symbol.category.toLowerCase().includes(cleanQuery);
    return matchesCategory && matchesQuery;
  });
}

function getText(symbol, language, key) {
  if (key === 'name') return symbol.en;
  if (key === 'localName') return language === 'vi' ? symbol.vi : symbol.en;
  if (key === 'explanation') return language === 'vi' ? symbol.explanationVi : symbol.explanationEn;
  if (key === 'mistake') return language === 'vi' ? symbol.mistakeVi : symbol.mistakeEn;
  return '';
}

function getUiText(language, key) {
  const copy = {
    en: {
      appBadge: 'Piano Symbol Learning App',
      title: 'Learn sheet music symbols without feeling lost.',
      subtitle: 'A clean symbol library with flashcards, quizzes, and progress tracking for beginner piano students.',
      progress: 'Your progress', learned: 'symbols learned', categories: 'Categories',
      searchPlaceholder: 'Search by English, Vietnamese, or category', noResults: 'No symbols match your search.',
      symbolDetail: 'Symbol detail', localName: 'Vietnamese name', whatItDoes: 'What it does', commonMistake: 'Common mistake',
      marked: 'Marked as learned', mark: 'Mark as learned', flashcards: 'Flashcards', flashHint: 'Tap the card to reveal the answer.',
      cards: 'cards', question: 'What is this symbol?', reviewAgain: 'Review again', iKnowThis: 'I know this',
      quickQuiz: 'Quick Quiz', quizHint: 'Choose the correct English name for the symbol.', score: 'Score', explanation: 'Explanation',
      nextQuestion: 'Next question', learningProgress: 'Learning Progress', storageHint: 'Progress is saved on this computer.',
      categoryProgress: 'Category progress', contentLanguage: 'Content language'
    },
    vi: {
      appBadge: 'Ứng dụng học ký hiệu piano',
      title: 'Học ký hiệu bản nhạc mà không bị rối.',
      subtitle: 'Thư viện ký hiệu gọn gàng, có flashcard, quiz và theo dõi tiến độ cho người mới học piano.',
      progress: 'Tiến độ của bạn', learned: 'ký hiệu đã học', categories: 'Nhóm ký hiệu',
      searchPlaceholder: 'Tìm bằng tiếng Anh, tiếng Việt hoặc nhóm ký hiệu', noResults: 'Không có ký hiệu nào khớp với tìm kiếm.',
      symbolDetail: 'Chi tiết ký hiệu', localName: 'Tên tiếng Việt', whatItDoes: 'Ý nghĩa', commonMistake: 'Lỗi thường gặp',
      marked: 'Đã đánh dấu là đã học', mark: 'Đánh dấu là đã học', flashcards: 'Flashcards', flashHint: 'Chạm vào thẻ để xem đáp án.',
      cards: 'thẻ', question: 'Đây là ký hiệu gì?', reviewAgain: 'Ôn lại', iKnowThis: 'Mình biết rồi',
      quickQuiz: 'Quiz nhanh', quizHint: 'Chọn đúng tên tiếng Anh của ký hiệu.', score: 'Điểm', explanation: 'Giải thích',
      nextQuestion: 'Câu tiếp theo', learningProgress: 'Tiến độ học', storageHint: 'Tiến độ được lưu trên máy này.',
      categoryProgress: 'Tiến độ theo nhóm', contentLanguage: 'Ngôn ngữ nội dung'
    }
  };
  return copy[language][key] || copy.en[key] || key;
}

function getQuizOptions(list, quizSymbol, quizIndex) {
  const wrong = list
    .filter((symbol) => symbol.id !== quizSymbol.id)
    .slice((quizIndex * 3) % Math.max(list.length - 3, 1))
    .slice(0, 3);
  return [...wrong, quizSymbol].sort((a, b) => a.en.localeCompare(b.en));
}

function runRuntimeTests() {
  console.assert(symbols.length >= 12, 'Dataset should contain at least 12 symbols.');
  console.assert(categories.includes('Clefs & Staff'), 'Categories should include Clefs & Staff.');
  console.assert(filterSymbols(symbols, 'All', 'khóa sol').some((item) => item.id === 'treble-clef'), 'Vietnamese search should find treble clef.');
  console.assert(filterSymbols(symbols, 'Dynamics', '').every((item) => item.category === 'Dynamics'), 'Category filter should only return selected category.');
  console.assert(getText(symbols[0], 'vi', 'name') === 'Treble Clef', 'Names should remain English.');
  console.assert(getText(symbols[0], 'vi', 'explanation') === symbols[0].explanationVi, 'Vietnamese mode should show Vietnamese explanation.');
  console.assert(getQuizOptions(symbols, symbols[0], 0).length === 4, 'Quiz should generate four options.');
}
runRuntimeTests();

export default function App() {
  const [tab, setTab] = useState('learn');
  const [language, setLanguage] = useState('vi');
  const [activeCategory, setActiveCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(symbols[0].id);
  const [learned, setLearned] = useState({});
  const [flashIndex, setFlashIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [quizIndex, setQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('piano-symbol-progress');
      if (saved) setLearned(JSON.parse(saved));
    } catch (error) {
      console.warn('Progress could not be loaded.', error);
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem('piano-symbol-progress', JSON.stringify(learned));
    } catch (error) {
      console.warn('Progress could not be saved.', error);
    }
  }, [learned]);

  const filteredSymbols = useMemo(() => filterSymbols(symbols, activeCategory, query), [activeCategory, query]);
  const selectedSymbol = symbols.find((symbol) => symbol.id === selectedId) || symbols[0];
  const currentFlashcard = filteredSymbols.length > 0 ? filteredSymbols[flashIndex % filteredSymbols.length] : symbols[0];
  const quizSymbol = symbols[quizIndex % symbols.length];
  const quizOptions = useMemo(() => getQuizOptions(symbols, quizSymbol, quizIndex), [quizIndex, quizSymbol]);
  const learnedCount = Object.values(learned).filter(Boolean).length;
  const progressPercent = Math.round((learnedCount / symbols.length) * 100);

  function t(key) { return getUiText(language, key); }
  function markLearned(id) { setLearned((current) => ({ ...current, [id]: !current[id] })); }
  function nextFlashcard(known) {
    if (known) setLearned((current) => ({ ...current, [currentFlashcard.id]: true }));
    setFlipped(false);
    setFlashIndex((current) => current + 1);
  }
  function answerQuiz(answerId) {
    if (selectedAnswer) return;
    setSelectedAnswer(answerId);
    if (answerId === quizSymbol.id) {
      setScore((current) => current + 1);
      setLearned((current) => ({ ...current, [quizSymbol.id]: true }));
    }
  }
  function nextQuiz() {
    setSelectedAnswer(null);
    setQuizIndex((current) => current + 1);
  }

  const tabs = [
    ['learn', 'Learn'], ['flashcards', 'Flashcards'], ['quiz', 'Quiz'], ['progress', 'Progress']
  ];

  return (
    <main className="app">
      <div className="shell">
        <header className="hero">
          <section>
            <div className="badge">♪ {t('appBadge')}</div>
            <h1>{t('title')}</h1>
            <p>{t('subtitle')}</p>
          </section>
          <section className="progress-card dark">
            <div className="between"><span>{t('progress')}</span><span className="star">★</span></div>
            <div className="big-percent">{progressPercent}%</div>
            <p>{learnedCount} of {symbols.length} {t('learned')}</p>
            <div className="bar"><div style={{ width: `${progressPercent}%` }} /></div>
          </section>
        </header>

        <section className="topbar">
          <nav className="tabs">
            {tabs.map(([id, label]) => <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>{label}</button>)}
          </nav>
          <select value={language} onChange={(event) => setLanguage(event.target.value)} aria-label={t('contentLanguage')}>
            <option value="vi">Tiếng Việt</option>
            <option value="en">English</option>
          </select>
        </section>

        {tab === 'learn' && (
          <section className="learn-grid">
            <aside className="panel">
              <h2>{t('categories')}</h2>
              <div className="category-list">
                {categories.map((category) => (
                  <button key={category} onClick={() => setActiveCategory(category)} className={activeCategory === category ? 'active' : ''}>
                    <span>{category}</span><span>{category === 'All' ? symbols.length : symbols.filter((item) => item.category === category).length}</span>
                  </button>
                ))}
              </div>
            </aside>

            <section className="panel">
              <input className="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('searchPlaceholder')} />
              {filteredSymbols.length === 0 ? <div className="empty">{t('noResults')}</div> : (
                <div className="symbol-grid">
                  {filteredSymbols.map((symbol) => (
                    <button key={symbol.id} className={selectedId === symbol.id ? 'symbol-card selected' : 'symbol-card'} onClick={() => setSelectedId(symbol.id)}>
                      <div className="symbol-top"><span className="symbol-icon">{symbol.icon}</span>{learned[symbol.id] && <span className="check">✓</span>}</div>
                      <strong>{getText(symbol, language, 'name')}</strong>
                      <small>Level {symbol.level} · {symbol.category}</small>
                    </button>
                  ))}
                </div>
              )}
            </section>

            <aside className="panel detail">
              <div className="detail-head">
                <div>
                  <small>{t('symbolDetail')}</small>
                  <h2>{getText(selectedSymbol, language, 'name')}</h2>
                  {language === 'vi' && <p>{t('localName')}: {getText(selectedSymbol, language, 'localName')}</p>}
                </div>
                <div className="detail-icon">{selectedSymbol.icon}</div>
              </div>
              <div className="note-box"><h3>{t('whatItDoes')}</h3><p>{getText(selectedSymbol, language, 'explanation')}</p></div>
              <div className="note-box outline"><h3>{t('commonMistake')}</h3><p>{getText(selectedSymbol, language, 'mistake')}</p></div>
              <button className="primary full" onClick={() => markLearned(selectedSymbol.id)}>{learned[selectedSymbol.id] ? t('marked') : t('mark')}</button>
            </aside>
          </section>
        )}

        {tab === 'flashcards' && (
          <section className="center-panel panel">
            <div className="between"><div><h2>{t('flashcards')}</h2><p>{t('flashHint')}</p></div><span className="pill">{filteredSymbols.length || symbols.length} {t('cards')}</span></div>
            <button className="flash-card" onClick={() => setFlipped((value) => !value)}>
              {!flipped ? <><div className="huge-symbol">{currentFlashcard.icon}</div><p>{t('question')}</p></> : <><div className="large-symbol">{currentFlashcard.icon}</div><h2>{getText(currentFlashcard, language, 'name')}</h2>{language === 'vi' && <p className="muted">{currentFlashcard.vi}</p>}<p>{getText(currentFlashcard, language, 'explanation')}</p></>}
            </button>
            <div className="two-buttons"><button onClick={() => nextFlashcard(false)}>{t('reviewAgain')}</button><button className="primary" onClick={() => nextFlashcard(true)}>{t('iKnowThis')}</button></div>
          </section>
        )}

        {tab === 'quiz' && (
          <section className="center-panel panel">
            <div className="between"><div><h2>{t('quickQuiz')}</h2><p>{t('quizHint')}</p></div><span className="pill">{t('score')} {score}/{quizIndex}</span></div>
            <div className="quiz-symbol">{quizSymbol.icon}</div>
            <div className="quiz-options">
              {quizOptions.map((option) => {
                const isCorrect = option.id === quizSymbol.id;
                const isSelected = selectedAnswer === option.id;
                let className = 'option';
                if (selectedAnswer && isCorrect) className += ' correct';
                if (selectedAnswer && isSelected && !isCorrect) className += ' wrong';
                return <button key={option.id} className={className} onClick={() => answerQuiz(option.id)}>{option.en}</button>;
              })}
            </div>
            {selectedAnswer && <div className="note-box"><h3>{t('explanation')}</h3><p>{getText(quizSymbol, language, 'explanation')}</p><button className="primary" onClick={nextQuiz}>{t('nextQuestion')}</button></div>}
          </section>
        )}

        {tab === 'progress' && (
          <section className="progress-grid">
            <div className="panel"><h2>{t('learningProgress')}</h2><p>{t('storageHint')}</p><div className="big-percent dark-text">{progressPercent}%</div><div className="bar light"><div style={{ width: `${progressPercent}%` }} /></div></div>
            <div className="panel"><h2>{t('categoryProgress')}</h2>{categories.filter((category) => category !== 'All').map((category) => {
              const items = symbols.filter((symbol) => symbol.category === category);
              const done = items.filter((symbol) => learned[symbol.id]).length;
              const percent = Math.round((done / items.length) * 100);
              return <div className="category-progress" key={category}><div className="between"><span>{category}</span><span>{done}/{items.length}</span></div><div className="bar light"><div style={{ width: `${percent}%` }} /></div></div>;
            })}</div>
          </section>
        )}
      </div>
    </main>
  );
}
