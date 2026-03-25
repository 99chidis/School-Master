import React, { useState } from 'react';
import { AppLayout } from '@/components/AppLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Plus, Send, Paperclip, MoreVertical, CheckCheck, ArrowLeft } from 'lucide-react';

const CONVERSATIONS = [
  { id: 1, name: 'Mrs. Patricia Lee', role: 'Teacher · Grade 8A', avatar: 'PL', time: '10:42 AM', preview: 'Emma has been improving greatly this term...', unread: 2, online: true },
  { id: 2, name: 'Mr. David Okafor', role: 'Teacher · Science', avatar: 'DO', time: 'Yesterday', preview: 'The lab equipment request has been approved.', unread: 0, online: false },
  { id: 3, name: 'Johnson Family', role: 'Parent · Emma Johnson', avatar: 'JF', time: 'Yesterday', preview: 'Thank you for the update on her progress.', unread: 1, online: false },
  { id: 4, name: 'Coach Amara Singh', role: 'PE Department', avatar: 'AS', time: 'Mon', preview: 'Sports day schedule has been finalized!', unread: 0, online: true },
  { id: 5, name: 'Ms. Rachel Torres', role: 'Librarian', avatar: 'RT', time: 'Mon', preview: 'New books have arrived, please review...', unread: 0, online: false },
  { id: 6, name: 'Finance Office', role: 'Administration', avatar: 'FO', time: 'Mar 20', preview: 'Q3 budget report is ready for review.', unread: 0, online: true },
  { id: 7, name: 'Smith Family', role: 'Parent · Noah Smith', avatar: 'SF', time: 'Mar 19', preview: 'We would like to schedule a meeting.', unread: 0, online: false },
];

const THREAD = [
  { id: 1, me: false, time: '10:30 AM', text: "Good morning! I wanted to share that Emma has shown remarkable improvement in her mathematics this term. Her assignment scores have consistently been above 90%." },
  { id: 2, me: true, time: '10:35 AM', text: "That's wonderful to hear! We've noticed her enthusiasm has really picked up as well. Is there anything we can do to further support her learning?" },
  { id: 3, me: false, time: '10:38 AM', text: "She would benefit greatly from the advanced problem sets I have prepared. I can send them home for extra practice if you'd like." },
  { id: 4, me: false, time: '10:42 AM', text: "Also, I wanted to flag that the mid-term exams are scheduled for April 7–11. Emma is well prepared but a bit of revision over the break would be helpful." },
];

export default function Messages() {
  const [selected, setSelected] = useState<typeof CONVERSATIONS[0] | null>(null);
  const [message, setMessage] = useState('');

  const showThread = selected !== null;

  return (
    <AppLayout pageTitle="Messages">
      <div className="h-[calc(100vh-8rem)] flex gap-4 min-h-0">

        {/* Inbox List — hidden on mobile when thread is open */}
        <Card className={`
          flex flex-col min-h-0 border-slate-200 shadow-sm
          ${showThread ? 'hidden md:flex md:w-[300px] md:shrink-0' : 'flex w-full md:w-[300px] md:shrink-0'}
        `}>
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-800">Inbox</h2>
              <Button size="sm" className="h-8 gap-1.5 bg-[#1e3a5f] hover:bg-[#152a45] text-white">
                <Plus className="h-3.5 w-3.5" />New
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input placeholder="Search messages..." className="pl-9 h-9 bg-slate-50 border-slate-200 text-sm" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
            {CONVERSATIONS.map(c => (
              <button
                key={c.id}
                onClick={() => setSelected(c)}
                className={`w-full text-left p-4 hover:bg-slate-50 transition-colors ${selected?.id === c.id ? 'bg-sky-50 border-r-2 border-sky-500' : ''}`}
              >
                <div className="flex items-start gap-3">
                  <div className="relative shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-sky-500 flex items-center justify-center text-white text-xs font-bold">
                      {c.avatar}
                    </div>
                    {c.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-slate-800 text-sm truncate">{c.name}</span>
                      <span className="text-xs text-slate-400 shrink-0 ml-2">{c.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-0.5">{c.role}</p>
                    <p className="text-xs text-slate-500 truncate">{c.preview}</p>
                  </div>
                  {c.unread > 0 && (
                    <span className="shrink-0 h-5 w-5 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center mt-1">
                      {c.unread}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </Card>

        {/* Thread — hidden on mobile when no conversation selected */}
        {showThread ? (
          <Card className="flex-1 border-slate-200 shadow-sm flex flex-col min-h-0">
            <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-3">
                {/* Back button — mobile only */}
                <button
                  onClick={() => setSelected(null)}
                  className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition mr-1"
                  aria-label="Back to inbox"
                >
                  <ArrowLeft className="h-5 w-5" />
                </button>
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#1e3a5f] to-sky-500 flex items-center justify-center text-white text-xs font-bold">
                    {selected.avatar}
                  </div>
                  {selected.online && <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-white" />}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{selected.name}</p>
                  <p className="text-xs text-slate-400">{selected.online ? 'Online now' : selected.role}</p>
                </div>
              </div>
              <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition">
                <MoreVertical className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
              {THREAD.map(m => (
                <div key={m.id} className={`flex gap-3 ${m.me ? 'justify-end' : 'justify-start'}`}>
                  {!m.me && (
                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#1e3a5f] to-sky-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mt-1">
                      {selected.avatar}
                    </div>
                  )}
                  <div className={`max-w-[85%] md:max-w-[70%] ${m.me ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                      m.me ? 'bg-[#1e3a5f] text-white rounded-br-sm' : 'bg-slate-100 text-slate-700 rounded-bl-sm'
                    }`}>
                      {m.text}
                    </div>
                    <div className={`flex items-center gap-1 text-xs text-slate-400 ${m.me ? 'flex-row-reverse' : ''}`}>
                      <span>{m.time}</span>
                      {m.me && <CheckCheck className="h-3.5 w-3.5 text-sky-400" />}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-4 md:px-6 pb-4 md:pb-5 pt-4 border-t border-slate-100 shrink-0">
              <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
                <button className="text-slate-400 hover:text-slate-600 transition p-1">
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  className="flex-1 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 outline-none min-w-0"
                  placeholder="Type a message..."
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && setMessage('')}
                />
                <button
                  onClick={() => setMessage('')}
                  className="bg-[#1e3a5f] hover:bg-[#152a45] text-white p-2 rounded-lg transition shrink-0"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Card>
        ) : (
          /* Empty state — desktop only when nothing selected */
          <Card className="hidden md:flex flex-1 border-slate-200 shadow-sm items-center justify-center">
            <div className="text-center text-slate-400">
              <div className="h-14 w-14 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3">
                <Send className="h-6 w-6" />
              </div>
              <p className="font-medium text-slate-600">Select a conversation</p>
              <p className="text-sm mt-1">Choose from your inbox to start reading</p>
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
