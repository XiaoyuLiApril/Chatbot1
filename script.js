// 当前对话的步骤计数
let currentStep = 0;

// 当前聊天记录框的字体大小
let currentFontSize = 18; // 默认字体大小为18px


// 预设的对话流程
const dialogueFlow = [
    { sender: 'bot', message: '您好！很高兴认识您，我是您的陪伴机器人。我希望能通过和您聊天，帮助您感到更开心、更放松。以下是我的形象。' },
    { sender: 'bot', avatar: true }, // 机器人头像作为一条消息
    { sender: 'bot', message: '我们可以从了解您的基本情况开始。' },
    { sender: 'bot', message: '首先，您能告诉我您的名字吗？' },
    { sender: 'user', response: true }, // 用户的回复
    { sender: 'bot', message: '好的，感谢您！' },
    { sender: 'bot', message: '您现在多大年纪了呢？' },
    { sender: 'user', response: true },
    { sender: 'bot', message: '好的，谢谢您告诉我！' },
    { sender: 'bot', message: '您平时喜欢做些什么？比如看电视、绘画、下棋、散步，或者其他什么爱好呢？' },
    { sender: 'user', response: true },
    { sender: 'bot', message: '我明白了，谢谢您的分享！兴趣爱好会让我们的生活更加丰富。' },
    { sender: 'bot', message: '您平时是否有做一些锻炼？像散步、太极拳、瑜伽，或者其他您喜欢的运动方式？' },
    { sender: 'user', response: true },
    { sender: 'bot', message: '好的，谢谢您告诉我！锻炼能帮助我们保持健康。' },
    { sender: 'bot', message: '您是和家人住在一起吗？还是独居呢？' },
    { sender: 'user', response: true },
    { sender: 'bot', message: '谢谢您和我分享这些信息！您的回答会帮助我更好地了解您。' },
    { sender: 'bot', message: '您平时会和哪些人交谈呢？是朋友、家人、邻居，还是其他亲近的人？' },
    { sender: 'user', response: true },
    { sender: 'bot', message: '我明白了，谢谢您的分享！和他人交流会让我们觉得温暖。' },
    { sender: 'bot', message: '接下来，我们将进入聊天环节。我们可以谈论一些话题，您可以自由表达，无论是什么我都很乐意倾听。我希望能通过和您聊天，让您感到更好。' },
    { sender: 'bot', message: '今天的天气怎么样？您现在感觉如何？' },
    { sender: 'user', response: true },
    { sender: 'bot', message: '您有出去走走吗，或者您有做其他锻炼吗？' },
    { sender: 'user', response: true },
    { sender: 'bot', message: '适当的锻炼能让我们身心都更健康！' },
    { sender: 'bot', message: '您今天有和家人或是朋友见面吗？你们相处得愉快吗？' },
    { sender: 'user', response: true },
    { sender: 'bot', message: '我明白了，谢谢您告诉我！' },
    { sender: 'bot', message: '最近让您感到愉快或平静的事情是什么呢？' },
    { sender: 'user', response: true },
    { sender: 'bot', message: '我明白了，谢谢您告诉我！我们可以一起聚焦在正面的体验上，希望您可以保持积极的心情。' },
    { sender: 'bot', message: '回忆过去的美好时光会让我们感到温暖和安慰。如果您愿意分享，我会很高兴听到您的故事！那些美好的回忆也许可以让我们感受到爱与温暖。' },
    { sender: 'bot', message: '请选择一个您感兴趣的话题。', options: [
        { label: '生命中最幸福的时光', value: '生命中最幸福的时光' },
        { label: '让自己骄傲的事情', value: '让自己骄傲的事情' },
        { label: '年轻时最喜欢做的事情', value: '年轻时最喜欢做的事情' }
    ] }
];


// 初始化聊天框
function initializeChat() {
    currentStep = 0; // 重置步骤计数
    let chatBox = document.getElementById('chat-box');
    chatBox.innerHTML = ''; // 清空聊天记录
    displayMessage(dialogueFlow[currentStep]); // 显示第一条消息
}

// 显示对话内容
function displayMessage(step) {
    if (!step) return;

    if (step.sender === 'bot') {
        if (step.avatar) {
            // 显示机器人头像
            addBotProfileAvatar();
        } else {
            // 显示机器人的消息
            addMessage('bot', step.message);

            // 如果消息有选项，显示选项按钮
            if (step.options) {
                addOptions(step.options); // 调用函数生成选项按钮
                return; // 停止自动显示下一条消息，等待用户选择
            }
        }
        // 自动显示下一条消息
        currentStep++;
        setTimeout(() => displayMessage(dialogueFlow[currentStep]), 1000);
    } else if (step.sender === 'user' && step.response) {
        // 等待用户输入
        enableUserInput();
    }
}

//插入机器人头像作为一条消息
function addBotProfileAvatar() {
    const chatBox = document.getElementById('chat-box');
    const selectedAvatar = 'realism-high';  // 直接设置为固定的头像名称
    const avatarSrc = `${selectedAvatar}.png`; // 获取头像路径

    const avatarMessageElem = document.createElement('div');
    avatarMessageElem.classList.add('message', 'bot');

    // 消息内容为大头像图片
    avatarMessageElem.innerHTML = `
        <img src="${selectedAvatar}.png" class="message-avatar" alt="机器人头像">
        <img src="${avatarSrc}" class="profile-avatar" alt="机器人头像">
    `;

    chatBox.appendChild(avatarMessageElem);

    // 确保聊天框滚动到底部
    chatBox.scrollTop = chatBox.scrollHeight;
}

let isOptionStep = false; // 初始值为 false，表示不是选项环节

//动态生成按钮并添加到聊天框
function addOptions(options) {
    isOptionStep = true; // 标记当前为选项环节
    const chatBox = document.getElementById('chat-box');
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options-container');

    // 为每个选项创建按钮
    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = option.label;
        button.style.fontSize = `${currentFontSize}px`; // 设置按钮字体大小
        button.onclick = () => handleOptionClick(option.value); // 点击按钮触发事件
        optionsContainer.appendChild(button);
    });

    chatBox.appendChild(optionsContainer);

    // 确保聊天框滚动到底部
    chatBox.scrollTop = chatBox.scrollHeight;
}

//当用户点击按钮后，将选择作为用户消息显示，并触发下一条对话。
function handleOptionClick(selectedValue) {
    isOptionStep = false; // 恢复状态
    
    // 判断用户点击的是否是 "结束对话"
    if (selectedValue === '结束对话') {
        // 显示用户的选择
        addMessage('user', '结束对话');
        // 显示机器人的结束回复
        addMessage('bot', '对话已结束。感谢您的时间！希望您一切顺利！');
        // 移除选项按钮
        const optionsContainer = document.querySelector('.options-container');
        if (optionsContainer) {
            optionsContainer.remove();
        }
        return; // 停止后续逻辑
    }

    // 如果点击的是普通的回答选项（如【是、或多或少、否】）
    if (selectedValue === '是' || selectedValue === '或多或少' || selectedValue === '否') {
        // 显示用户的选择
        addMessage('user', selectedValue);
        // 移除选项按钮
        const optionsContainer = document.querySelector('.options-container');
        if (optionsContainer) {
            optionsContainer.remove();
        }
        // 显示下一条消息
        currentStep++;
        setTimeout(() => displayMessage(dialogueFlow[currentStep]), 500);
        return; // 停止后续逻辑
    }

    // 如果点击的是话题选项（如【生命中最幸福的时光】、【让自己骄傲的事情】、【年轻时最喜欢做的事情】）
    addMessage('user', selectedValue);

    // 移除选项按钮
    const optionsContainer = document.querySelector('.options-container');
    if (optionsContainer) {
        optionsContainer.remove();
    }

    // 根据用户选择生成后续的对话
    let nextMessages = [];
    if (selectedValue === '生命中最幸福的时光') {
        nextMessages = [
            { sender: 'bot', message: '回想一下您生命中最幸福的时光，那时您和谁在一起，做了什么？' },
            { sender: 'user', response: true }, // 等待用户回复
            { sender: 'bot', message: '听起来那是一个非常美好的时光！感谢您与我分享这一段回忆。' }
        ];
    } else if (selectedValue === '让自己骄傲的事情') {
        nextMessages = [
            { sender: 'bot', message: '您有没有做过一些让自己很骄傲的事情？那些经历对您有什么特别的意义？' },
            { sender: 'user', response: true }, // 等待用户回复
            { sender: 'bot', message: '非常感谢您分享这些宝贵的经历！这些经历确实值得骄傲。' }
        ];
    } else if (selectedValue === '年轻时最喜欢做的事情') {
        nextMessages = [
            { sender: 'bot', message: '您记得自己年轻时最喜欢做的事情是什么吗？能和我分享吗？' },
            { sender: 'user', response: true }, // 等待用户回复
            { sender: 'bot', message: '这听起来非常有趣！这一定是一段充满活力和快乐的时光！' }
        ];
    }

    // 添加通用结束语和结束按钮
    nextMessages.push(
        { sender: 'bot', message: '今天聊得很愉快，感谢您和我分享这些宝贵的经历！您随时可以和我聊天，我会在这里等着您的。祝您有愉快的一天！' , 
            options: [{ label: '结束对话', value: '结束对话' }]}
    );

    // 将后续对话插入到流程中
    dialogueFlow.splice(currentStep + 1, 0, ...nextMessages);

    // 显示下一条消息
    currentStep++;
    setTimeout(() => displayMessage(dialogueFlow[currentStep]), 500);
}



// 启用用户输入
function enableUserInput() {
    let inputArea = document.getElementById('user-input');
    if (inputArea) {
        inputArea.disabled = false; // 启用输入框
        inputArea.focus(); // 自动聚焦
    } else {
        console.error('没有找到textarea元素');
    }
}

// 发送用户输入
function sendMessage() {
    let userInput = document.getElementById('user-input');
    let message = userInput.value.trim();
    if (message) {
        if (isOptionStep) {
            // 如果是选项环节，提醒用户点击按钮
            addMessage('bot', '您可以点击上方的按钮进行回答。');
            userInput.value = ''; // 清空输入框
            return; // 不继续对话
        }

        // 正常处理用户输入
        addMessage('user', message); // 显示用户消息
        userInput.value = ''; // 清空输入框
        userInput.disabled = true; // 禁用输入框
        currentStep++;
        setTimeout(() => displayMessage(dialogueFlow[currentStep]), 1000); // 显示下一条机器人消息
    }
}


// 切换到状态2，显示语音输入相关按钮
function showState2() {
    const inputArea = document.getElementById('input-area');
    
    // 进入状态2时，修改input-area的内容
    inputArea.innerHTML = `
        <button class="start-speech-btn" onclick="showState3()">点击 开始说话</button>
        <button class="keyboard-btn" onclick="showState1()">键盘输入</button>
    `;
    inputArea.classList.add('state2'); // 应用状态2的样式
}

// 切换到状态1，恢复默认输入框和按钮
function showState1() {
    const inputArea = document.getElementById('input-area');
    
    // 恢复到原来的输入框和按钮
    inputArea.innerHTML = `
        <textarea id="user-input"></textarea>
        <button onclick="sendMessage()">发送</button>
        <button onclick="showState2()">语音输入</button>
    `;
    inputArea.classList.remove('state2'); // 移除状态2的样式
    inputArea.classList.remove('state3'); // 移除状态3的样式
    inputArea.classList.remove('state4'); // 移除状态4的样式

    // 清空录音相关内容
    recordingTime = 0;
    document.getElementById('recording-time').textContent = '00:00'; // 清空录音时长显示
    currentStep = 0; // 清空聊天记录
}

// 切换到状态3，准备录音界面
function showState3() {
    // 更新 input-area 为状态3
    document.getElementById('input-area').innerHTML = `
        <!-- 第一行：竖线动画和录音状态 -->
        <div class="audio-recording">
            <div class="audio-animation">
                <!-- 竖线动画 -->
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
            </div>
            <div class="recording-status">
                <span>录音中</span>
                <span id="recording-duration">00:00</span> <!-- 显示录音时长 -->
            </div>
            <div class="audio-animation">
                <!-- 竖线动画 -->
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
                <span class="audio-bar"></span>
            </div>
        </div>

        <!-- 按钮 -->
        <div class="button-container">
            <button onclick="endRecording()" class="stop-recording-btn">点击 结束说话</button>
            <button onclick="showState1()" class="keyboard-btn">键盘输入</button>
        </div>
    `;
    startRecording(); // 启动录音
}

//停止录音
function endRecording() {
    // 如果 mediaRecorder 存在，则停止录音
    if (mediaRecorder) {
        mediaRecorder.stop(); // 停止录音
    }
    
    clearInterval(recordingInterval); // 清除定时器，停止计时
    recordingInterval = null; // 重置定时器变量
    showState4(); // 录音结束后切换到状态4
}

// 状态4：结束录音并显示操作按钮
function showState4() {
    // 格式化录音时长
    const minutes = Math.floor(recordingTime / 60);
    const seconds = recordingTime % 60;
    const recordingDuration = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    // 更新 HTML 内容
    document.getElementById('input-area').innerHTML = `
        <div class="audio-container">
            <div class="audio-bubble" onclick="playRecording('${audioUrl}')">
                <span id="recording-duration">${recordingDuration}</span>
                <i class="fa-solid fa-wifi fa-rotate-270 fa-xs" style="color: #000000; margin-left: 5px;"></i>
            </div>
        
            <button onclick="deleteRecording()" class="delete-btn">删除</button>
            <button onclick="sendRecording()" class="send-btn">发送</button>
            <button onclick="showState1()" class="keyboard-btn">键盘输入</button>
        </div>
    `;
}

let currentPlayingAudio = null; // 当前正在播放的音频对象

// 播放录音
function playRecording(audioSrc) {
    if (!audioSrc) {
        console.error("没有可播放的录音文件");
        return;
    }

    // 解码 audioSrc
    audioSrc = decodeURIComponent(audioSrc);

    // 如果有正在播放的音频
    if (currentPlayingAudio) {
        if (currentPlayingAudio.src === audioSrc) {
            if (!currentPlayingAudio.paused) {
                currentPlayingAudio.pause();
                console.log("暂停当前录音");
            } else {
                currentPlayingAudio.play();
                console.log("继续播放当前录音");
            }
            return;
        }

        // 如果点击的是不同的录音，暂停当前音频
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0; // 重置到开头
    }

    // 播放新的录音
    currentPlayingAudio = new Audio(audioSrc);
    currentPlayingAudio.play();

    // 监听录音播放结束事件
    currentPlayingAudio.onended = () => {
        console.log("录音播放结束");
        currentPlayingAudio = null;
    };

    console.log(`播放新的录音: ${audioSrc}`);
}

// 监听全局点击事件
document.addEventListener('click', (event) => {
    // 同时检查状态4和聊天记录中的录音气泡
    const target = event.target.closest('.audio-bubble, .message.user span');

    if (target) {
        const audioSrc = target.getAttribute('data-src'); // 获取音频路径
        if (audioSrc) {
            playRecording(audioSrc);
        }
    } else if (currentPlayingAudio) {
        // 点击其他位置暂停录音
        currentPlayingAudio.pause();
        currentPlayingAudio.currentTime = 0;
        console.log("暂停当前播放的录音");
        currentPlayingAudio = null;
    }
});

// 监听键盘事件，按下 Enter 时发送消息
document.addEventListener('keydown', (event) => {
    if (event.key === "Enter" && !event.shiftKey) { 
        event.preventDefault(); // 阻止默认换行行为
        
        // 判断当前是否是语音输入模式（状态4）
        if (document.getElementById("input-area").querySelector(".audio-bubble")) {
            sendRecording(); // 发送语音
        } else {
            sendMessage(); // 发送文本
        }
    }
});


// 删除录音
function deleteRecording() {
    audioBlob = null; // 清空录音数据
    audioUrl = null;  // 清空音频 URL
    audio = null;     // 清空音频对象
    document.getElementById('recording-duration').textContent = '00:00'; // 清空录音时长显示
    showState2(); // 返回状态2
}


// 发送录音
function sendRecording() {
    if (isOptionStep) {
        // 如果是选项环节，提醒用户点击按钮
        addMessage('bot', '您可以点击上方的按钮进行回答。');
        showState2(); // 返回语音输入初始状态
        return; // 不继续对话
    }

    const minutes = Math.floor(recordingTime / 60);
    const seconds = recordingTime % 60;
    const recordingDuration = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

    handleUserMessage(recordingDuration, true, audioUrl); // 调用通用处理函数，传递语音数据
    showState2(); // 返回语音输入初始状态
}

// 用 MediaRecorder 开始录音
let mediaRecorder;
let audioChunks = [];
let audioBlob;
let audioUrl;
let audio;
let recordingTime = 0; // 声明录音时长变量
let recordingInterval;

function startRecording() {
    audioChunks = []; // 清空上次的录音数据
    recordingTime = 0; // 重置录音时长
    navigator.mediaDevices.getUserMedia({ audio: true }) // 获取音频流
        .then(stream => {
            mediaRecorder = new MediaRecorder(stream); // 创建录音对象
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data); // 将录音数据保存在 audioChunks 数组中
            };
            mediaRecorder.onstop = () => {
                audioBlob = new Blob(audioChunks, { type: 'audio/ogg' }); // 生成录音 Blob 对象
                audioUrl = URL.createObjectURL(audioBlob); // 创建音频 URL
                audio = new Audio(audioUrl); // 创建音频对象，方便播放
                showState4(); // 录音结束后切换到状态4
            };
            mediaRecorder.start(); // 开始录音
            updateRecordingDuration(); // 启动录音时长更新
        })
        .catch(error => {
            console.error("录音设备错误:", error); // 捕获错误并输出
        });
}

// 更新录音时长显示
function updateRecordingDuration() {
    // 检查并清除已有的定时器
    if (recordingInterval) {
        clearInterval(recordingInterval);
    }

    // 启动新的定时器
    recordingInterval = setInterval(() => {
        recordingTime++;
        const minutes = Math.floor(recordingTime / 60);
        const seconds = recordingTime % 60;
        const recordingDuration = `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;

        // 更新状态3的录音时长显示
        const recordingDisplay = document.getElementById('recording-duration');
        if (recordingDisplay) {
            recordingDisplay.textContent = recordingDuration;
        }
    }, 1000);
}


// 添加消息到聊天框
function addMessage(sender, message, isAudio = false, audioDuration = null, audioSrc = null) {
    let chatBox = document.getElementById('chat-box');
    let messageElem = document.createElement('div');
    messageElem.classList.add('message', sender); // 保留用户消息样式（如靠右对齐）

    // 根据发送者选择头像路径
    let avatarSrc;
    if (sender === 'user') {
        avatarSrc = 'user-avatar.png'; // 用户头像路径
    } else {
        const selectedAvatar = 'realism-high';  // 这里可以选择任何固定的头像名称
        avatarSrc = `${selectedAvatar}.png`;
    }

    // 如果是音频消息
    if (isAudio) {
        messageElem.innerHTML = `
            <img src="${avatarSrc}" class="message-avatar" alt="${sender === 'user' ? '用户头像' : '机器人头像'}" />
            <span data-src="${encodeURIComponent(audioSrc)}">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ${audioDuration}
                <i class="fa-solid fa-wifi fa-rotate-270 fa-xs" style="color: #000000; margin-left: 5px;"></i>
            </span>
        `;
    
    } else {
        // 如果是文字消息
        messageElem.innerHTML = `
            <img src="${avatarSrc}" class="message-avatar" alt="${sender === 'user' ? '用户头像' : '机器人头像'}" />
            <span>${message}</span>
        `;
    }

    // 添加消息到聊天框
    chatBox.appendChild(messageElem);
    chatBox.scrollTop = chatBox.scrollHeight; // 滚动到底部
}

// 统一处理用户消息
function handleUserMessage(content, isAudio = false, audioUrl = null) {
    // 添加用户的消息到聊天框
    if (isAudio) {
        addMessage('user', '', true, content, audioUrl); // 显示语音消息
    } else {
        addMessage('user', content); // 显示文本消息
    }

    // 继续对话流程
    currentStep++;
    setTimeout(() => displayMessage(dialogueFlow[currentStep]), 1000); // 延迟显示下一条消息
}


// 增大字体大小
function increaseFontSize() {
    currentFontSize += 2; // 每次增大2px
    updateFontSize();
}

// 减小字体大小
function decreaseFontSize() {
    if (currentFontSize > 10) { // 最小字体大小限制
        currentFontSize -= 2; // 每次减小2px
        updateFontSize();
    }
}

// 更新聊天框字体大小
function updateFontSize() {
    const chatBox = document.querySelector('.chat-box');
    const optionButtons = document.querySelectorAll('.option-button'); // 获取所有选项按钮

    // 更新聊天框字体大小
    chatBox.style.fontSize = `${currentFontSize}px`;

    // 更新选项按钮字体大小
    optionButtons.forEach(button => {
        button.style.fontSize = `${currentFontSize}px`;
    });
}


// 初始化聊天
initializeChat();

