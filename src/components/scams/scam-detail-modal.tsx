
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { format, formatDistanceToNow } from 'date-fns';
import { Calendar, Globe, MessageSquare, Send, User as UserIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { Scam, User, Comment } from '@/lib/definitions';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getCommentsByScamId, getUserById, addComment } from '@/lib/data';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface ScamDetailModalProps {
  scam: Scam;
  user: User | undefined;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

type CommentWithUser = {
  comment: Comment;
  user: User | undefined;
};

export default function ScamDetailModal({
  scam,
  user,
  isOpen,
  onOpenChange,
}: ScamDetailModalProps) {
  const image = PlaceHolderImages.find(p => p.id === scam.imageId);
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

  // For optimistic updates, we assume the current user is Alex Johnson
  // In a real app, you would get this from an auth context
  const currentUser: User = {
    id: 'user-1',
    name: 'Alex Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?u=user-1',
  };

  useEffect(() => {
    async function loadComments() {
      if (isOpen) {
        setIsLoadingComments(true);
        const commentsData = await getCommentsByScamId(scam.id);
        const commentsWithUsers = await Promise.all(
          commentsData.map(async comment => {
            const user = await getUserById(comment.authorId);
            return { comment, user };
          })
        );
        setComments(commentsWithUsers);
        setIsLoadingComments(false);
      }
    }
    loadComments();
  }, [isOpen, scam.id]);

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    setIsPosting(true);

    const tempCommentId = `temp-${Date.now()}`;
    const optimisticComment: CommentWithUser = {
      comment: {
        id: tempCommentId,
        scamId: scam.id,
        authorId: currentUser.id,
        content: newComment,
        createdAt: new Date().toISOString(),
      },
      user: currentUser,
    };

    setComments(prev => [...prev, optimisticComment]);
    setNewComment('');

    try {
      const savedComment = await addComment(scam.id, currentUser.id, newComment.trim());
      // Replace temporary comment with real one from server
      setComments(prev =>
        prev.map(c => (c.comment.id === tempCommentId ? { comment: savedComment, user: currentUser } : c))
      );
    } catch (error) {
      console.error('Failed to post comment:', error);
      // Revert optimistic update on failure
      setComments(prev => prev.filter(c => c.comment.id !== tempCommentId));
    } finally {
      setIsPosting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">{scam.title}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {image && (
            <div className="relative mb-8 h-64 w-full overflow-hidden rounded-lg shadow-lg md:h-96">
              <Image
                src={image.imageUrl}
                alt={image.description}
                data-ai-hint={image.imageHint}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <Badge variant="destructive" className="text-base md:text-lg">
                  {scam.type}
                </Badge>
              </div>
            </div>
          )}

          <h1 className="font-headline text-3xl font-extrabold tracking-tighter sm:text-4xl md:text-5xl">
            {scam.title}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-4 text-sm text-muted-foreground">
            {user && (
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span>Reported by {user.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{format(new Date(scam.createdAt), 'MMMM d, yyyy')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4" />
              <span>{scam.country}</span>
            </div>
          </div>

          <Card className="mt-10">
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Report Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap font-body text-base leading-relaxed">
                {scam.description}
              </p>
            </CardContent>
          </Card>

          <Card className="mt-10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <MessageSquare /> Community Discussion
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {isLoadingComments ? (
                  <>
                    <CommentSkeleton />
                    <CommentSkeleton />
                  </>
                ) : comments.length > 0 ? (
                  comments.map(({ comment: c, user: commentUser }) => (
                    <div key={c.id} className="flex gap-4">
                      <Avatar>
                        <AvatarImage src={commentUser?.avatarUrl} alt={commentUser?.name} />
                        <AvatarFallback>{commentUser?.name.charAt(0) ?? 'U'}</AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{commentUser?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                          </p>
                        </div>
                        <p className="mt-1 text-muted-foreground">{c.content}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-center text-muted-foreground">
                    No comments yet. Be the first to say something!
                  </p>
                )}
              </div>

              <div className="mt-8 flex gap-4">
                <Avatar>
                  <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                  <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="w-full space-y-2">
                  <Textarea
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    disabled={isPosting}
                  />
                  <Button onClick={handlePostComment} disabled={isPosting || !newComment.trim()}>
                    {isPosting ? 'Posting...' : 'Post Comment'} <Send className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function CommentSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="w-full space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  )
}
