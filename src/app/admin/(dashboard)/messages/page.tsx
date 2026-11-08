'use client';

import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Search,
  CheckCircle2,
  Trash2,
  Mail,
  Loader2,
  X,
  Eye,
} from 'lucide-react';
import { ContactMessage } from '@/types';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'resolved'>('all');

  // Detail Modal
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/admin/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data || []);
      }
    } catch (err) {
      console.error('Fetch messages error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    queueMicrotask(() => {
      void fetchMessages();
    });
  }, []);

  const handleStatusChange = async (id: string, newStatus: 'unread' | 'read' | 'resolved') => {
    try {
      const res = await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus }),
      });

      if (res.ok) {
        setMessages((prev) =>
          prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
        );
        if (activeMessage && activeMessage.id === id) {
          setActiveMessage({ ...activeMessage, status: newStatus });
        }
      }
    } catch (err) {
      console.error('Status change error:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to permanently delete this message?')) return;
    try {
      const res = await fetch(`/api/admin/messages?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessages((prev) => prev.filter((m) => m.id !== id));
        if (activeMessage?.id === id) setActiveMessage(null);
        setStatusMessage({ type: 'success', text: 'Message deleted successfully.' });
      }
    } catch (err) {
      console.error('Delete message error:', err);
    }
  };

  const handleOpenMessage = (msg: ContactMessage) => {
    setActiveMessage(msg);
    if (msg.status === 'unread') {
      handleStatusChange(msg.id, 'read');
    }
  };

  const filteredMessages = messages.filter((m) => {
    const matchesFilter = statusFilter === 'all' || m.status === statusFilter;
    const query = search.toLowerCase();
    const matchesSearch =
      m.name.toLowerCase().includes(query) ||
      m.email.toLowerCase().includes(query) ||
      m.subject.toLowerCase().includes(query) ||
      m.message.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Contact Inquiries</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Read, organize, and reply to client requests and job opportunities.
          </p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 rounded-xl text-xs sm:text-sm flex items-center gap-2.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Status Filter Buttons */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.06] overflow-x-auto">
          {(['all', 'unread', 'read', 'resolved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all whitespace-nowrap ${
                statusFilter === tab
                  ? 'bg-violet-600 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab} (
              {tab === 'all'
                ? messages.length
                : messages.filter((m) => m.status === tab).length}
              )
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search inquiries..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#111827] border border-white/[0.08] text-xs text-white placeholder-slate-500 outline-none focus:border-violet-500"
          />
        </div>
      </div>

      {/* Messages List / Table */}
      {loading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <Loader2 className="w-8 h-8 text-violet-500 animate-spin" />
        </div>
      ) : (
        <div className="rounded-2xl bg-[#111827]/80 border border-white/[0.08] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#0D1220] border-b border-white/[0.08] text-[11px] font-mono uppercase tracking-wider text-slate-400">
                <tr>
                  <th className="px-6 py-3.5">Sender</th>
                  <th className="px-6 py-3.5">Subject</th>
                  <th className="px-6 py-3.5">Date</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {filteredMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    onClick={() => handleOpenMessage(msg)}
                    className={`hover:bg-white/[0.03] transition-colors cursor-pointer ${
                      msg.status === 'unread' ? 'bg-violet-950/10' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <span className={`text-sm block ${msg.status === 'unread' ? 'font-bold text-white' : 'font-medium text-slate-200'}`}>
                          {msg.name}
                        </span>
                        <span className="text-xs font-mono text-slate-400 block">{msg.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5 max-w-md">
                        <span className={`text-xs block truncate ${msg.status === 'unread' ? 'font-semibold text-white' : 'text-slate-300'}`}>
                          {msg.subject}
                        </span>
                        <span className="text-xs text-slate-500 block truncate">
                          {msg.message}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-mono text-slate-400 whitespace-nowrap">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                          msg.status === 'unread'
                            ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            : msg.status === 'resolved'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                        }`}
                      >
                        {msg.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleOpenMessage(msg)}
                          className="p-1.5 rounded-lg bg-white/[0.04] text-slate-400 hover:text-white"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(msg.id)}
                          className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredMessages.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-xs text-slate-500">
                      No inquiries match the current search or filter.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Message Reader Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-2xl bg-[#111827] border border-white/[0.1] shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-violet-400" />
                <h3 className="text-lg font-bold text-white tracking-tight">Message Details</h3>
              </div>
              <button
                onClick={() => setActiveMessage(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase">From</span>
                  <p className="text-sm font-bold text-white">{activeMessage.name}</p>
                  <a
                    href={`mailto:${activeMessage.email}`}
                    className="text-xs text-violet-400 hover:underline"
                  >
                    {activeMessage.email}
                  </a>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-400 uppercase block">Received</span>
                  <span className="text-xs font-mono text-slate-300">
                    {new Date(activeMessage.created_at).toLocaleString()}
                  </span>
                </div>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase block mb-1">
                  Subject
                </span>
                <p className="text-base font-semibold text-white">{activeMessage.subject}</p>
              </div>

              <div>
                <span className="text-xs font-mono text-slate-400 uppercase block mb-1">
                  Message Content
                </span>
                <div className="p-4 rounded-xl bg-[#080B12] border border-white/[0.06] text-sm text-slate-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                  {activeMessage.message}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 font-mono">Mark status:</span>
                  <button
                    onClick={() => handleStatusChange(activeMessage.id, 'unread')}
                    className={`px-2.5 py-1 rounded text-xs font-mono ${
                      activeMessage.status === 'unread'
                        ? 'bg-rose-500/20 text-rose-300 font-bold'
                        : 'bg-white/[0.05] text-slate-400'
                    }`}
                  >
                    Unread
                  </button>
                  <button
                    onClick={() => handleStatusChange(activeMessage.id, 'read')}
                    className={`px-2.5 py-1 rounded text-xs font-mono ${
                      activeMessage.status === 'read'
                        ? 'bg-slate-500/20 text-white font-bold'
                        : 'bg-white/[0.05] text-slate-400'
                    }`}
                  >
                    Read
                  </button>
                  <button
                    onClick={() => handleStatusChange(activeMessage.id, 'resolved')}
                    className={`px-2.5 py-1 rounded text-xs font-mono ${
                      activeMessage.status === 'resolved'
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold'
                        : 'bg-white/[0.05] text-slate-400'
                    }`}
                  >
                    Resolved
                  </button>
                </div>

                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-600/20"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
