// Fake data for dynamic frontend functionality

export const fakeUsers = [
  {
    id: "1",
    username: "ecowarrior123",
    email: "eco@example.com",
    avatar_url: "https://images.unsplash.com/photo-1494790108755-2616b612b070?w=100&h=100&fit=crop&crop=face",
    bio: "Passionate about sustainable living and renewable energy!",
    eco_score: 892,
    location: "San Francisco, CA",
    created_at: "2024-01-15T10:00:00Z"
  },
  {
    id: "2", 
    username: "greenthumb_sara",
    email: "sara@example.com",
    avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    bio: "Urban gardener and zero-waste advocate 🌱",
    eco_score: 745,
    location: "Portland, OR",
    created_at: "2024-02-20T14:30:00Z"
  },
  {
    id: "3",
    username: "mike_sustainable", 
    email: "mike@example.com",
    avatar_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    bio: "Electric vehicle enthusiast and climate activist",
    eco_score: 623,
    location: "Austin, TX",
    created_at: "2024-03-10T09:15:00Z"
  },
  {
    id: "4",
    username: "nature_lover_emma",
    email: "emma@example.com", 
    avatar_url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    bio: "Hiking, recycling, and spreading eco-awareness everywhere I go!",
    eco_score: 567,
    location: "Denver, CO",
    created_at: "2024-01-28T16:45:00Z"
  },
  {
    id: "5",
    username: "solar_power_sam",
    email: "sam@example.com",
    avatar_url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face", 
    bio: "Solar energy installer helping homes go green ☀️",
    eco_score: 934,
    location: "Phoenix, AZ",
    created_at: "2024-02-14T11:20:00Z"
  }
];

export const fakePosts = [
  {
    id: "1",
    user_id: "1",
    title: "My First Month of Zero Waste Living",
    content: "I've been trying to live zero waste for a month now, and the results have been amazing! I've reduced my trash output by 80% and discovered so many creative ways to reuse items. The biggest challenge was food packaging, but I found some great local bulk stores. Here are my top 5 tips for getting started...",
    image_url: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=400&fit=crop",
    type: "article",
    likes: 45,
    comments_count: 12,
    created_at: "2024-07-17T10:30:00Z"
  },
  {
    id: "2", 
    user_id: "2",
    title: "Urban Garden Update",
    content: "Look at my rooftop garden progress! 🌱 These tomatoes and herbs are thriving despite the city environment. Growing your own food reduces carbon footprint and tastes so much better. Anyone else trying urban gardening?",
    image_url: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
    type: "photo",
    likes: 78,
    comments_count: 8,
    created_at: "2024-07-16T15:20:00Z"
  },
  {
    id: "3",
    user_id: "3", 
    title: "Electric Vehicle Road Trip Success!",
    content: "Just completed a 500-mile road trip in my Tesla Model 3! The charging infrastructure has improved so much. We saved approximately 150kg of CO2 compared to a gas car, and the total 'fuel' cost was only $25. The future of transportation is electric! ⚡",
    image_url: "https://images.unsplash.com/photo-1593941707882-a5bac6861d75?w=600&h=400&fit=crop",
    type: "photo",
    likes: 92,
    comments_count: 15,
    created_at: "2024-07-15T08:45:00Z"
  },
  {
    id: "4",
    user_id: "4",
    title: "Beach Cleanup Results",
    content: "Our community beach cleanup this weekend was incredible! 25 volunteers collected over 200 pounds of trash and recyclables. Found everything from plastic bottles to old fishing nets. It's heartbreaking to see the impact on marine life, but together we can make a difference. Next cleanup is scheduled for August 15th!",
    image_url: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&h=400&fit=crop",
    type: "article", 
    likes: 134,
    comments_count: 23,
    created_at: "2024-07-14T12:10:00Z"
  },
  {
    id: "5",
    user_id: "5",
    title: "Solar Panel Installation Complete!",
    content: "Finally got my home solar system installed! 20 panels generating 8kW should cover 95% of our electricity needs. The installation process took 2 days and we're already seeing the energy production. Estimated CO2 reduction: 4 tons per year. Best investment ever! ☀️",
    image_url: "https://images.unsplash.com/photo-1569163139394-de44cb5d2c6c?w=600&h=400&fit=crop",
    type: "photo",
    likes: 156,
    comments_count: 31,
    created_at: "2024-07-13T14:55:00Z"
  }
];

export const fakeComments = [
  {
    id: "1",
    post_id: "1", 
    user_id: "2",
    content: "This is so inspiring! I've been wanting to start zero waste. Do you have any specific bulk store recommendations?",
    created_at: "2024-07-17T11:15:00Z"
  },
  {
    id: "2",
    post_id: "1",
    user_id: "3", 
    content: "Great tips! The food packaging challenge is real. I started bringing my own containers to delis and it works great.",
    created_at: "2024-07-17T12:30:00Z"
  },
  {
    id: "3", 
    post_id: "2",
    user_id: "1",
    content: "Your garden looks amazing! I'm trying container gardening on my balcony. Any advice for small spaces?",
    created_at: "2024-07-16T16:45:00Z"
  },
  {
    id: "4",
    post_id: "3",
    user_id: "4",
    content: "That's awesome! How was the charging experience on the road trip? Any range anxiety?",
    created_at: "2024-07-15T09:20:00Z"
  },
  {
    id: "5",
    post_id: "4", 
    user_id: "5",
    content: "Thank you for organizing this! I was there and it felt great to make a tangible difference. Count me in for August!",
    created_at: "2024-07-14T13:25:00Z"
  }
];

export const getCommunityPosts = () => {
  return fakePosts.map(post => ({
    ...post,
    user: fakeUsers.find(user => user.id === post.user_id),
    comments: fakeComments.filter(comment => comment.post_id === post.id).map(comment => ({
      ...comment,
      user: fakeUsers.find(user => user.id === comment.user_id)
    }))
  }));
};

export const getPostById = (id: string) => {
  const post = fakePosts.find(post => post.id === id);
  if (!post) return null;
  
  return {
    ...post,
    user: fakeUsers.find(user => user.id === post.user_id),
    comments: fakeComments.filter(comment => comment.post_id === post.id).map(comment => ({
      ...comment,
      user: fakeUsers.find(user => user.id === comment.user_id)
    }))
  };
};

export const addNewPost = (postData: any) => {
  const newPost = {
    id: String(fakePosts.length + 1),
    ...postData,
    likes: 0,
    comments_count: 0,
    created_at: new Date().toISOString()
  };
  fakePosts.unshift(newPost);
  return newPost;
};

export const addNewComment = (postId: string, userId: string, content: string) => {
  const newComment = {
    id: String(fakeComments.length + 1),
    post_id: postId,
    user_id: userId,
    content,
    created_at: new Date().toISOString()
  };
  fakeComments.push(newComment);
  
  // Update comment count
  const post = fakePosts.find(p => p.id === postId);
  if (post) {
    post.comments_count += 1;
  }
  
  return {
    ...newComment,
    user: fakeUsers.find(user => user.id === userId)
  };
};