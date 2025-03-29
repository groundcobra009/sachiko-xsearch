// 初期設定
document.addEventListener('DOMContentLoaded', function() {
  // ダークモード設定の復元
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  
  // 日付の初期設定
  const today = new Date();
  const nextYear = new Date();
  nextYear.setFullYear(today.getFullYear() + 1);
  
  document.getElementById('startDate').valueAsDate = today;
  document.getElementById('endDate').valueAsDate = nextYear;
  
  // 保存された検索条件の読み込み
  loadSavedSearches();
});

// フォーム送信処理
document.getElementById('searchForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const keyword = document.getElementById('keyword').value.trim();
  const username = document.getElementById('username').value.trim();
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const minLikes = document.getElementById('likeCount').textContent;
  const country = document.getElementById('countrySelect').value;
  
  // 検索クエリの構築
  let query = '';
  
  if (keyword) {
    query += keyword;
  }
  
  if (username) {
    if (username.startsWith('@')) {
      query += ` from:${username.substring(1)}`;
    } else {
      query += ` from:${username}`;
    }
  }
  
  if (startDate && endDate) {
    query += ` since:${startDate} until:${endDate}`;
  }
  
  if (minLikes && minLikes !== '0') {
    query += ` min_faves:${minLikes}`;
  }
  
  if (country) {
    query += ` lang:${country}`;
  }
  
  // 検索URLの構築と新しいタブでの表示
  const searchUrl = `https://twitter.com/search?q=${encodeURIComponent(query)}&src=typed_query&f=live`;
  window.open(searchUrl, '_blank');
});

// ダークモードトグル
document.getElementById('themeToggle').addEventListener('click', function() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
});

// いいね数のコントロール
document.getElementById('decreaseCount').addEventListener('click', function() {
  let count = parseInt(document.getElementById('likeCount').textContent);
  if (count >= 100) {
    count -= 100;
    document.getElementById('likeCount').textContent = count;
  }
});

document.getElementById('increaseCount').addEventListener('click', function() {
  let count = parseInt(document.getElementById('likeCount').textContent);
  count += 100;
  document.getElementById('likeCount').textContent = count;
});

// モーダル関連の処理
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close-btn');

// ショートカットモーダル
document.getElementById('shortcutBtn').addEventListener('click', function() {
  document.getElementById('shortcutModal').style.display = 'flex';
});

// ヘルプモーダル
document.getElementById('helpBtn').addEventListener('click', function() {
  document.getElementById('helpModal').style.display = 'flex';
});

// 共有モーダル
document.getElementById('shareBtn').addEventListener('click', function() {
  const keyword = document.getElementById('keyword').value.trim();
  const username = document.getElementById('username').value.trim();
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const minLikes = document.getElementById('likeCount').textContent;
  const country = document.getElementById('countrySelect').value;
  
  // 共有URLの生成
  const params = new URLSearchParams();
  if (keyword) params.append('q', keyword);
  if (username) params.append('user', username);
  if (startDate) params.append('start', startDate);
  if (endDate) params.append('end', endDate);
  if (minLikes) params.append('likes', minLikes);
  if (country) params.append('country', country);
  
  const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
  document.getElementById('shareUrl').value = shareUrl;
  document.getElementById('shareModal').style.display = 'flex';
});

// 共有URLコピー
document.getElementById('copyShareUrl').addEventListener('click', function() {
  const shareUrlInput = document.getElementById('shareUrl');
  shareUrlInput.select();
  document.execCommand('copy');
  this.textContent = 'コピーしました！';
  setTimeout(() => {
    this.textContent = 'URLをコピー';
  }, 2000);
});

// 保存した検索モーダル
document.getElementById('savedSearchesBtn').addEventListener('click', function() {
  loadSavedSearches();
  document.getElementById('savedSearchesModal').style.display = 'flex';
});

// お気に入りに追加
document.getElementById('favoriteBtn').addEventListener('click', function() {
  const keyword = document.getElementById('keyword').value.trim();
  const username = document.getElementById('username').value.trim();
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;
  const minLikes = document.getElementById('likeCount').textContent;
  const country = document.getElementById('countrySelect').value;
  
  // 検索に名前を付けるプロンプト
  const searchName = prompt('この検索に名前を付けてください：', keyword || 'マイ検索');
  if (!searchName) return;
  
  // 保存する検索オブジェクトの作成
  const searchData = {
    name: searchName,
    keyword: keyword,
    username: username,
    startDate: startDate,
    endDate: endDate,
    minLikes: minLikes,
    country: country,
    timestamp: new Date().toISOString()
  };
  
  // 既存の保存検索の取得
  let savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
  savedSearches.push(searchData);
  
  // ローカルストレージへの保存
  localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
  
  // ボタンの状態を変更
  this.innerHTML = `
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
    </svg>
    お気に入りに追加済み
  `;
  this.classList.add('active');
  
  // 2秒後に元に戻す
  setTimeout(() => {
    this.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
      </svg>
      お気に入りに追加
    `;
    this.classList.remove('active');
  }, 2000);
});

// モーダルを閉じる
closeButtons.forEach(button => {
  button.addEventListener('click', function() {
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
  });
});

// モーダル外クリックで閉じる
window.addEventListener('click', function(event) {
  modals.forEach(modal => {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// キーボードショートカット
document.addEventListener('keydown', function(e) {
  // Ctrl + Enter: 検索実行
  if (e.ctrlKey && e.key === 'Enter') {
    e.preventDefault();
    document.getElementById('searchForm').dispatchEvent(new Event('submit'));
  }
  
  // Ctrl + S: お気に入り追加
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    document.getElementById('favoriteBtn').click();
  }
  
  // Ctrl + R: フォーム初期化
  if (e.ctrlKey && e.key === 'r') {
    e.preventDefault();
    document.getElementById('searchForm').reset();
  }
  
  // Ctrl + D: ダークモード切替
  if (e.ctrlKey && e.key === 'd') {
    e.preventDefault();
    document.getElementById('themeToggle').click();
  }
  
  // ESC: モーダルを閉じる
  if (e.key === 'Escape') {
    modals.forEach(modal => {
      modal.style.display = 'none';
    });
  }
});

// 保存された検索の読み込み
function loadSavedSearches() {
  const savedSearches = JSON.parse(localStorage.getItem('savedSearches') || '[]');
  const savedSearchesList = document.getElementById('savedSearchesList');
  
  if (savedSearches.length === 0) {
    savedSearchesList.innerHTML = '<p>保存された検索条件がありません。</p>';
    return;
  }
  
  let html = '';
  savedSearches.forEach((search, index) => {
    html += `
      <div class="advanced-option" data-index="${index}" style="margin-bottom: 8px;">
        <div class="option-left">
          <div class="option-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
            </svg>
          </div>
          <span class="option-label">${search.name}</span>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="load-search" data-index="${index}" style="background: none; border: none; cursor: pointer; color: var(--primary-color);">
            読込
          </button>
          <button class="delete-search" data-index="${index}" style="background: none; border: none; cursor: pointer; color: var(--text-secondary);">
            削除
          </button>
        </div>
      </div>
    `;
  });
  
  savedSearchesList.innerHTML = html;
  
  // 保存した検索の読み込みイベント
  document.querySelectorAll('.load-search').forEach(button => {
    button.addEventListener('click', function() {
      const index = this.getAttribute('data-index');
      const search = savedSearches[index];
      
      document.getElementById('keyword').value = search.keyword || '';
      document.getElementById('username').value = search.username || '';
      document.getElementById('startDate').value = search.startDate || '';
      document.getElementById('endDate').value = search.endDate || '';
      document.getElementById('likeCount').textContent = search.minLikes || '0';
      document.getElementById('countrySelect').value = search.country || '';
      
      // モーダルを閉じる
      document.getElementById('savedSearchesModal').style.display = 'none';
    });
  });
  
  // 保存した検索の削除イベント
  document.querySelectorAll('.delete-search').forEach(button => {
    button.addEventListener('click', function() {
      if (confirm('この保存した検索を削除しますか？')) {
        const index = this.getAttribute('data-index');
        savedSearches.splice(index, 1);
        localStorage.setItem('savedSearches', JSON.stringify(savedSearches));
        loadSavedSearches();
      }
    });
  });
}

// URLパラメータからフォームに値を設定
function loadSearchParamsFromUrl() {
  const params = new URLSearchParams(window.location.search);
  
  if (params.has('q')) document.getElementById('keyword').value = params.get('q');
  if (params.has('user')) document.getElementById('username').value = params.get('user');
  if (params.has('start')) document.getElementById('startDate').value = params.get('start');
  if (params.has('end')) document.getElementById('endDate').value = params.get('end');
  if (params.has('likes')) document.getElementById('likeCount').textContent = params.get('likes');
  if (params.has('country')) document.getElementById('countrySelect').value = params.get('country');
}

// URLパラメータがある場合は読み込む
loadSearchParamsFromUrl(); 