import React, { useState, useEffect } from 'react';
import {
    Box, IconButton, Drawer, Typography, TextField, Button,
    Paper, Avatar, Divider
} from '@mui/material';
import {
    SmartToy, Close, Send
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
    const greetings = [
        { text: 'Hey there! 👋 How can I help you today?', sender: 'bot' },
        { text: 'Hi! 😊 Welcome to ODOP! What brings you here?', sender: 'bot' },
        { text: 'Hello friend! 🌟 Need any assistance?', sender: 'bot' },
        { text: 'Namaste! 🙏 How may I assist you?', sender: 'bot' },
        { text: 'Heyyy! 🎉 Ready to explore amazing products?', sender: 'bot' },
        { text: 'Hola! 💜 I\'m here to help you!', sender: 'bot' },
        { text: 'Welcome! ✨ What can I do for you today?', sender: 'bot' },
        { text: 'Hi there! 🤗 Looking for something special?', sender: 'bot' },
        { text: 'Greetings! 🎨 Let me help you discover heritage crafts!', sender: 'bot' },
        { text: 'Hey! 🛍️ Ready to shop for unique products?', sender: 'bot' }
    ];

    const responses = [
        'That\'s a great question! 🤔 Let me help you with that!',
        'Awesome! 🌟 Our team will get back to you soon!',
        'Thanks for reaching out! 💬 We appreciate your interest!',
        'Got it! ✅ Someone will assist you shortly!',
        'Wonderful! 🎉 We\'re here to help!',
        'Perfect! 👍 We\'ll connect you with the right person!',
        'Amazing! 💫 Your message is important to us!',
        'Thank you! 😊 We\'re on it!'
    ];

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [initialGreeting] = useState(greetings[Math.floor(Math.random() * greetings.length)]);
    const [isTyping, setIsTyping] = useState(false);

    const quickTips = [
        '💡 Tip: Browse our heritage products from different districts!',
        '🎨 Did you know? Each product supports local artisans!',
        '✨ Explore unique handicrafts from Rajasthan!',
        '🛍️ Check out our latest collection!',
        '🌟 Free shipping on orders above ₹1000!',
        '💜 Rate your favorite products!'
    ];

    useEffect(() => {
        if (open && messages.length === 0) {
            // Show initial greeting immediately when opening
            setMessages([initialGreeting]);
            
            // Add a random tip after 2 seconds
            setTimeout(() => {
                setMessages(prev => [...prev, { 
                    text: quickTips[Math.floor(Math.random() * quickTips.length)], 
                    sender: 'bot' 
                }]);
            }, 2000);
        } else if (!open) {
            // Clear messages when drawer closes
            setMessages([]);
        }
    }, [open]);

    const handleToggle = () => {
        setOpen(!open);
    };

    const handleSend = async () => {
        if (input.trim()) {
            const userMessage = input;
            setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
            setInput('');
            setIsTyping(true);

            try {
                const response = await fetch('https://kuldeepkd28.app.n8n.cloud/webhook/project-brainnnova', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        message: userMessage,
                        timestamp: new Date().toISOString()
                    })
                });

                const responseText = await response.text();
                console.log('📥 Webhook Response:', responseText);
                let aiResponse = '';

                try {
                    const data = JSON.parse(responseText);
                    console.log('📦 Parsed Data:', data);
                    
                    // Extract text from webhook response
                    if (data?.reply) {
                        // Format: { reply: "..." }  
                        aiResponse = data.reply;
                        console.log('✅ Extracted (reply):', aiResponse);
                    } else if (Array.isArray(data) && data[0]?.content?.[0]?.text) {
                        // Format: [{ content: [{ text: "..." }] }]
                        aiResponse = data[0].content[0].text;
                        console.log('✅ Extracted (array):', aiResponse);
                    } else if (data?.output) {
                        // Format: { output: "..." }  
                        aiResponse = data.output;
                        console.log('✅ Extracted (output):', aiResponse);
                    } else if (data?.text) {
                        // Format: { text: "..." }
                        aiResponse = data.text;
                        console.log('✅ Extracted (text):', aiResponse);
                    } else if (typeof data === 'string') {
                        // Direct string response
                        aiResponse = data;
                        console.log('✅ Extracted (string):', aiResponse);
                    } else {
                        console.log('❌ Could not extract text from data');
                    }
                } catch (e) {
                    console.log('⚠️ JSON Parse Failed, using as text:', e);
                    // If not JSON, use as plain text
                    aiResponse = responseText;
                }

                // Display AI response
                setTimeout(() => {
                    setIsTyping(false);
                    if (aiResponse && aiResponse.trim()) {
                        setMessages(prev => [...prev, {
                            text: aiResponse.trim(),
                            sender: 'bot'
                        }]);
                    } else {
                        setMessages(prev => [...prev, {
                            text: 'Sorry, I could not process that request. Please try again! 😊',
                            sender: 'bot'
                        }]);
                    }
                }, 600);

            } catch (error) {
                setIsTyping(false);
                setMessages(prev => [...prev, {
                    text: 'Connection error! Please check your internet. 🌐',
                    sender: 'bot'
                }]);
            }
        }
    };

    return (
        <>
            {/* 3D Floating Chat Button */}
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                onClick={handleToggle}
                style={{
                    position: 'fixed',
                    bottom: '30px',
                    right: '30px',
                    zIndex: 1300,
                    cursor: 'pointer'
                }}
            >
                <Box
                    sx={{
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4), 0 5px 15px rgba(118, 75, 162, 0.3)',
                        position: 'relative',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        '&:hover': {
                            transform: 'translateY(-5px) scale(1.05)',
                            boxShadow: '0 15px 35px rgba(102, 126, 234, 0.5), 0 8px 20px rgba(118, 75, 162, 0.4)',
                        },
                        '&:active': {
                            transform: 'translateY(-2px) scale(1.02)',
                        },
                        '&::before': {
                            content: '""',
                            position: 'absolute',
                            top: '-5px',
                            left: '-5px',
                            right: '-5px',
                            bottom: '-5px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)',
                            zIndex: -1,
                            filter: 'blur(10px)',
                            opacity: 0.7,
                        }
                    }}
                >
                    <AnimatePresence mode="wait">
                        {!open ? (
                            <motion.div
                                key="ai-icon"
                                initial={{ rotate: -180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <SmartToy sx={{ fontSize: 35, color: 'white' }} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="close-icon"
                                initial={{ rotate: 180, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -180, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Close sx={{ fontSize: 35, color: 'white' }} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </Box>

                {/* Pulse Animation Ring */}
                {!open && (
                    <Box
                        sx={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            border: '2px solid',
                            borderColor: '#667eea',
                            animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                            '@keyframes pulse-ring': {
                                '0%': {
                                    transform: 'scale(1)',
                                    opacity: 1,
                                },
                                '100%': {
                                    transform: 'scale(1.8)',
                                    opacity: 0,
                                }
                            },
                            pointerEvents: 'none'
                        }}
                    />
                )}
            </motion.div>

            {/* Chat Drawer */}
            <Drawer
                anchor="right"
                open={open}
                onClose={handleToggle}
                PaperProps={{
                    sx: {
                        width: { xs: '100%', sm: 400 },
                        background: 'linear-gradient(to bottom, #f8f9fa 0%, #ffffff 100%)',
                    }
                }}
            >
                <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* Header */}
                    <Box
                        sx={{
                            p: 2,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 2
                        }}
                    >
                        <Avatar sx={{ bgcolor: 'white', color: '#667eea' }}>
                            <SmartToy />
                        </Avatar>
                        <Box>
                            <Typography variant="h6" fontWeight={700}>ODOP Assistant 🤖</Typography>
                            <Typography variant="caption">✨ Online • Always here to help!</Typography>
                        </Box>
                    </Box>

                    {/* Messages */}
                    <Box sx={{ flex: 1, p: 2, overflowY: 'auto' }}>
                        {Array.isArray(messages) && messages.map((msg, index) => {
                            try {
                                if (!msg || !msg.text) return null;
                                
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                                                mb: 2
                                            }}
                                        >
                                            <Paper
                                                sx={{
                                                    p: 1.5,
                                                    maxWidth: '75%',
                                                    bgcolor: msg.sender === 'user' ? '#667eea' : 'white',
                                                    color: msg.sender === 'user' ? 'white' : 'text.primary',
                                                    borderRadius: msg.sender === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                }}
                                            >
                                                <Typography variant="body2" sx={{ wordBreak: 'break-word' }}>
                                                    {typeof msg.text === 'string' ? msg.text : String(msg.text)}
                                                </Typography>
                                            </Paper>
                                        </Box>
                                    </motion.div>
                                );
                            } catch (err) {
                                return <Typography key={index} sx={{ color: 'red' }}>Error displaying message</Typography>;
                            }
                        })}
                        
                        {/* Typing Indicator */}
                        {isTyping && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'flex-start', mb: 2 }}>
                                    <Paper
                                        sx={{
                                            p: 1.5,
                                            bgcolor: 'white',
                                            borderRadius: '18px 18px 18px 4px',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                            display: 'flex',
                                            gap: 0.5
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: '#667eea',
                                                animation: 'bounce 1.4s infinite ease-in-out',
                                                '@keyframes bounce': {
                                                    '0%, 80%, 100%': { transform: 'scale(0)' },
                                                    '40%': { transform: 'scale(1)' }
                                                }
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: '#667eea',
                                                animation: 'bounce 1.4s infinite ease-in-out',
                                                animationDelay: '0.2s',
                                                '@keyframes bounce': {
                                                    '0%, 80%, 100%': { transform: 'scale(0)' },
                                                    '40%': { transform: 'scale(1)' }
                                                }
                                            }}
                                        />
                                        <Box
                                            sx={{
                                                width: 8,
                                                height: 8,
                                                borderRadius: '50%',
                                                bgcolor: '#667eea',
                                                animation: 'bounce 1.4s infinite ease-in-out',
                                                animationDelay: '0.4s',
                                                '@keyframes bounce': {
                                                    '0%, 80%, 100%': { transform: 'scale(0)' },
                                                    '40%': { transform: 'scale(1)' }
                                                }
                                            }}
                                        />
                                    </Paper>
                                </Box>
                            </motion.div>
                        )}
                    </Box>

                    <Divider />

                    {/* Input */}
                    <Box sx={{ p: 2, bgcolor: 'white' }}>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <TextField
                                fullWidth
                                placeholder="Type your message... 💬"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                size="small"
                                disabled={isTyping}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: 3
                                    }
                                }}
                            />
                            <IconButton
                                onClick={handleSend}
                                disabled={isTyping || !input.trim()}
                                sx={{
                                    bgcolor: '#667eea',
                                    color: 'white',
                                    '&:hover': {
                                        bgcolor: '#764ba2'
                                    },
                                    '&:disabled': {
                                        bgcolor: '#e0e0e0'
                                    }
                                }}
                            >
                                <Send />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
};

export default ChatBot;
