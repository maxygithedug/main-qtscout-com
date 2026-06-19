/**
 * 页面辅助脚本 - 提示卡片与徽章组件
 * 提供关键词标记、说明卡片及访问引导功能
 */
(function() {
  'use strict';

  // 配置数据
  const config = {
    siteUrl: 'https://main-qtscout.com',
    keywords: ['球探', '数据探查', '实时监测', '智能分析'],
    badges: ['🔍', '⚡', '📊', '💡'],
    tips: [
      '点击关键词可查看详细数据面板',
      '使用快捷键 Ctrl+Shift+K 快速搜索',
      '页面加载后自动初始化监测模块'
    ]
  };

  // 关键词徽章生成器
  function createBadge(keyword, index) {
    const badge = document.createElement('span');
    badge.className = 'keyword-badge';
    badge.dataset.index = index;
    badge.innerHTML = config.badges[index % config.badges.length] + ' ' + keyword;
    badge.title = '关键词: ' + keyword;
    badge.addEventListener('click', function(e) {
      e.stopPropagation();
      showTipCard('关键词: ' + keyword + '\n关联页面: ' + config.siteUrl);
    });
    return badge;
  }

  // 提示卡片显示
  function showTipCard(message) {
    let card = document.getElementById('tip-card-custom');
    if (!card) {
      card = document.createElement('div');
      card.id = 'tip-card-custom';
      card.style.cssText = 'position:fixed;top:20px;right:20px;background:#fff;border:2px solid #2a7;border-radius:8px;padding:16px;box-shadow:0 4px 12px rgba(0,0,0,0.15);z-index:9999;max-width:320px;font-family:sans-serif;';
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '✕';
      closeBtn.style.cssText = 'float:right;border:none;background:transparent;font-size:18px;cursor:pointer;color:#888;';
      closeBtn.addEventListener('click', function() { card.style.display = 'none'; });
      card.appendChild(closeBtn);
      document.body.appendChild(card);
    }
    const content = document.createElement('div');
    content.style.marginTop = '8px';
    content.textContent = message;
    card.innerHTML = '';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'float:right;border:none;background:transparent;font-size:18px;cursor:pointer;color:#888;';
    closeBtn.addEventListener('click', function() { card.style.display = 'none'; });
    card.appendChild(closeBtn);
    card.appendChild(content);
    card.style.display = 'block';
    setTimeout(function() { card.style.display = 'none'; }, 8000);
  }

  // 访问说明卡片
  function showAccessGuide() {
    const guide = document.createElement('div');
    guide.id = 'access-guide';
    guide.style.cssText = 'position:fixed;bottom:20px;left:20px;background:#f0f9ff;border:1px solid #4a9;border-radius:8px;padding:14px;box-shadow:0 2px 10px rgba(0,0,0,0.1);z-index:9998;max-width:280px;font-family:sans-serif;font-size:14px;line-height:1.6;';
    guide.innerHTML = '<strong>访问说明</strong><br>' +
      '本站提供球探数据服务，实时更新监测结果。<br>' +
      '详情请访问: <a href="' + config.siteUrl + '" target="_blank" style="color:#2a7;text-decoration:underline;">' + config.siteUrl + '</a><br>' +
      '提示: 点击徽章可查看相关信息。';
    const closeBtn = document.createElement('button');
    closeBtn.textContent = '✕';
    closeBtn.style.cssText = 'position:absolute;top:4px;right:8px;border:none;background:transparent;font-size:16px;cursor:pointer;color:#888;';
    closeBtn.addEventListener('click', function() { guide.remove(); });
    guide.appendChild(closeBtn);
    document.body.appendChild(guide);
    setTimeout(function() { if (guide.parentNode) guide.remove(); }, 30000);
  }

  // 初始化悬浮关键词列表
  function initKeywordList() {
    const container = document.createElement('div');
    container.id = 'keyword-badge-container';
    container.style.cssText = 'position:fixed;bottom:90px;right:20px;display:flex;flex-wrap:wrap;gap:8px;z-index:9997;';
    config.keywords.forEach(function(kw, idx) {
      const badge = createBadge(kw, idx);
      container.appendChild(badge);
    });
    document.body.appendChild(container);
  }

  // 样式注入
  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = '.keyword-badge { display:inline-block; background:#e8f5e9; color:#1b5e20; padding:6px 12px; border-radius:20px; font-size:14px; cursor:pointer; transition:transform 0.2s, background 0.2s; border:1px solid #c8e6c9; } .keyword-badge:hover { background:#c8e6c9; transform:scale(1.05); }';
    document.head.appendChild(style);
  }

  // 页面加载完成后启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      injectStyles();
      initKeywordList();
      showAccessGuide();
      // 默认显示一个提示
      setTimeout(function() {
        showTipCard('欢迎使用球探数据面板，关键词徽章已就绪。');
      }, 1500);
    });
  } else {
    injectStyles();
    initKeywordList();
    showAccessGuide();
    setTimeout(function() {
      showTipCard('欢迎使用球探数据面板，关键词徽章已就绪。');
    }, 1500);
  }
})();