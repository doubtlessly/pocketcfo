'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, MessageSquare, Clock } from 'lucide-react';
import { Conversation } from '@/data/mock';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversationId?: string;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
}

export function ConversationList({ 
  conversations, 
  activeConversationId, 
  onSelectConversation, 
  onNewConversation 
}: ConversationListProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Conversations</CardTitle>
          <Button
            size="sm"
            onClick={onNewConversation}
            className="bg-myobPurple hover:opacity-90"
          >
            <Plus className="h-4 w-4 mr-1" />
            New
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="space-y-1">
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                className={`w-full text-left p-3 hover:bg-gray-50 transition-colors border-l-4 ${
                  activeConversationId === conversation.id
                    ? 'border-myobPurple bg-myobMauve'
                    : 'border-transparent'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-900 truncate">
                      {conversation.title}
                    </h4>
                    <p className="text-xs text-gray-500 truncate mt-1">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-400 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(conversation.timestamp).toLocaleDateString()}
                      </span>
                      <Badge variant="outline" className="text-xs bg-myobMauve text-myobPurple border-myobLavender">
                        {conversation.messages.length}
                      </Badge>
                    </div>
                  </div>
                </div>
              </button>
            ))
          ) : (
            <div className="p-6 text-center">
              <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 mb-3">
                No conversations yet
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={onNewConversation}
                className="border-myobLavender text-myobPurple hover:bg-myobMauve"
              >
                Start your first conversation
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
