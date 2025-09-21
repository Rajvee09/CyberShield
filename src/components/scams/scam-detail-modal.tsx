
'use client';

import { useState, useEffect } from 'react';
import {
  format,
  formatDistanceToNow,
} from 'date-fns';
import {
  Calendar,
  Globe,
  MessageSquare,
  Send,
  User as UserIcon,
  TriangleAlert,
  ShieldAlert,
  FileWarning,
  LogIn,
} from 'lucide-react';
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
import { getCommentsByScamId, getUserById, addComment } from '@/lib/data';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { useAuth } from '@/context/auth-context';
import Link from 'next/link';

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

const severityStyles: { [key: string]: string } = {
  'Low - Annoyance':
    'bg-blue-100 text-blue-800 border-blue-200 hover:bg-blue-100',
  'Medium - Moderate risk':
    'bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-100',
  'High - Immediate danger':
    'bg-orange-100 text-orange-800 border-orange-200 hover:bg-orange-100',
  'Critical - Financial loss occurred':
    'bg-red-100 text-red-800 border-red-200 hover:bg-red-100',
};

export default function ScamDetailModal({
  scam,
  user,
  isOpen,
  onOpenChange,
}: ScamDetailModalProps) {
  const { user: currentUser } = useAuth();
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [isLoadingComments, setIsLoadingComments] = useState(true);

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
    if (!newComment.trim() || !currentUser) return;

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

    setComments(prev => [optimisticComment, ...prev]);
    setNewComment('');

    try {
      const savedComment = await addComment(
        scam.id,
        currentUser.id,
        newComment.trim()
      );
      // Replace temporary comment with real one from server
      setComments(prev =>
        prev.map(c =>
          c.comment.id === tempCommentId
            ? { comment: savedComment, user: currentUser }
            : c
        )
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
          <DialogTitle className="flex items-start gap-3 font-headline text-3xl font-extrabold tracking-tighter">
            <ShieldAlert className="mt-1 h-8 w-8 flex-shrink-0 text-destructive" />
            {scam.title}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-8 py-4">
          <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
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

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Scam Type
              </h3>
              <Badge
                className={cn(
                  'text-sm',
                  'border-pink-200 bg-pink-100 text-pink-800 hover:bg-pink-100'
                )}
              >
                {scam.type}
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Platform
              </h3>
              <Badge variant="secondary" className="text-sm">
                {scam.platform}
              </Badge>
            </div>
            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-muted-foreground">
                Severity
              </h3>
              <Badge className={cn('text-sm', severityStyles[scam.severity])}>
                {scam.severity}
              </Badge>
            </div>
          </div>

          {scam.financialLoss && scam.financialLoss > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <h3 className="font-semibold text-red-900">Financial Loss Reported</h3>
              <p className="font-headline text-3xl font-bold text-red-700">
                $
                {scam.financialLoss.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          )}

          <Separator />

          <div className="space-y-4">
            <h2 className="flex items-center gap-2 font-headline text-2xl font-bold">
              <FileWarning /> Report Details
            </h2>
            <p className="whitespace-pre-wrap font-body text-base leading-relaxed text-muted-foreground">
              {scam.description}
            </p>
          </div>

          {scam.warningSigns && scam.warningSigns.length > 0 && (
            <div className="space-y-3 rounded-lg border border-yellow-200 bg-yellow-50 p-4">
              <h3 className="flex items-center font-headline text-lg font-semibold text-yellow-900">
                <TriangleAlert className="mr-2 h-5 w-5 text-yellow-600" />
                Key Warning Signs
              </h3>
              <ul className="list-inside list-disc space-y-1 pl-2 text-yellow-800">
                {scam.warningSigns.map((sign, index) => (
                  <li key={index}>{sign}</li>
                ))}
              </ul>
            </div>
          )}

          <Card>
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
                        <AvatarImage
                          src={commentUser?.avatarUrl}
                          alt={commentUser?.name}
                        />
                        <AvatarFallback>
                          {commentUser?.name.charAt(0) ?? 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{commentUser?.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(c.createdAt), {
                              addSuffix: true,
                            })}
                          </p>
                        </div>
                        <p className="mt-1 text-muted-foreground">
                          {c.content}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="py-4 text-center text-muted-foreground">
                    No comments yet. Be the first to say something!
                  </p>
                )}
              </div>

             {currentUser ? (
                <div className="mt-8 flex gap-4">
                  <Avatar>
                    <AvatarImage
                      src={currentUser.avatarUrl}
                      alt={currentUser.name}
                    />
                    <AvatarFallback>
                      {currentUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="w-full space-y-2">
                    <Textarea
                      placeholder="Add a comment..."
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      disabled={isPosting}
                    />
                    <Button
                      onClick={handlePostComment}
                      disabled={isPosting || !newComment.trim()}
                    >
                      {isPosting ? 'Posting...' : 'Post Comment'}{' '}
                      <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="mt-8 rounded-lg border bg-secondary/30 p-6 text-center">
                  <h3 className="font-headline text-lg font-semibold">Join the Conversation</h3>
                  <p className="mt-2 text-sm text-muted-foreground">You must be logged in to post a comment.</p>
                  <Button asChild className="mt-4">
                    <Link href="/auth">
                      <LogIn className="mr-2 h-4 w-4" />
                      Login or Sign Up
                    </Link>
                  </Button>
                </div>
              )}
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
  );
}
