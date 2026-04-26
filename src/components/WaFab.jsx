import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageCircle } from "lucide-react";
import { useEffect } from "react";

const WA_NUM = "2347033576017";

export default function WaFab() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(true);

  const openChat = () => {
    if (!message.trim()) return;
    const encoded = encodeURIComponent(message.trim());
    window.open(`https://wa.me/${WA_NUM}?text=${encoded}`, "_blank");
    setMessage("");
    setOpen(false);
  };

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const updateVisibility = () => {
      const isMobile = media.matches;
      setVisible(!isMobile);
      if (isMobile) setOpen(false);
    };

    updateVisibility();
    media.addEventListener?.("change", updateVisibility);
    return () => media.removeEventListener?.("change", updateVisibility);
  }, []);

  return (
    <>
      {/* Chat dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 280, damping: 28 }}
            style={{
              position: "fixed",
              bottom: "90px",
              right: "24px",
              zIndex: 998,
              width: "320px",
              background: "#fff",
              borderRadius: "18px",
              overflow: "hidden",
              boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
              border: "1px solid #dce8f7",
            }}
          >
            {/* Header */}
            <div
              style={{
                background: "#25d366",
                padding: "1rem 1.2rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MessageCircle size={18} color="#fff" />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Sora',sans-serif",
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.2,
                    }}
                  >
                    Afolaray Nigeria Limited
                  </div>
                  <div
                    style={{
                      fontFamily: "'Sora',sans-serif",
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.75)",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <span
                      style={{
                        width: "6px",
                        height: "6px",
                        borderRadius: "50%",
                        background: "#fff",
                        display: "inline-block",
                      }}
                    />
                    Online
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  border: "none",
                  borderRadius: "8px",
                  width: "30px",
                  height: "30px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                <X size={15} />
              </button>
            </div>

            {/* Chat body */}
            <div
              style={{
                padding: "1.2rem",
                background: "#f0f7ff",
                minHeight: "100px",
              }}
            >
              {/* Greeting bubble */}
              <div
                style={{
                  display: "flex",
                  gap: "8px",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    background: "#25d366",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MessageCircle size={13} color="#fff" />
                </div>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: "0 12px 12px 12px",
                    padding: "10px 13px",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.07)",
                    maxWidth: "220px",
                  }}
                >
                  <p
                    style={{
                      fontFamily: "'Sora',sans-serif",
                      fontSize: "13px",
                      color: "#0d1b2e",
                      lineHeight: 1.6,
                      fontWeight: 300,
                      margin: 0,
                    }}
                  >
                    👋 Hi there! How can I help you today?
                  </p>
                  <div
                    style={{
                      fontFamily: "'Sora',sans-serif",
                      fontSize: "10px",
                      color: "#5a7599",
                      marginTop: "4px",
                      textAlign: "right",
                    }}
                  >
                    Afolaray
                  </div>
                </div>
              </div>
            </div>

            {/* Input area */}
            <div
              style={{
                padding: "0.8rem 1rem",
                background: "#fff",
                borderTop: "1px solid #dce8f7",
              }}
            >
              <div
                style={{ display: "flex", gap: "8px", alignItems: "flex-end" }}
              >
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      openChat();
                    }
                  }}
                  placeholder="Type your message…"
                  style={{
                    flex: 1,
                    padding: "9px 12px",
                    border: "1px solid #dce8f7",
                    borderRadius: "10px",
                    fontFamily: "'Sora',sans-serif",
                    fontSize: "13px",
                    fontWeight: 300,
                    outline: "none",
                    resize: "none",
                    color: "#0d1b2e",
                    background: "#f7faff",
                  }}
                />
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={openChat}
                  disabled={!message.trim()}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "10px",
                    background: message.trim() ? "#25d366" : "#dce8f7",
                    border: "none",
                    cursor: message.trim() ? "pointer" : "default",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "background 0.2s",
                  }}
                >
                  <Send size={16} color={message.trim() ? "#fff" : "#5a7599"} />
                </motion.button>
              </div>
              <div
                style={{
                  fontFamily: "'Sora',sans-serif",
                  fontSize: "10px",
                  color: "#5a7599",
                  textAlign: "center",
                  marginTop: "6px",
                }}
              >
                Sends to WhatsApp · usually replies in minutes
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        onClick={() => setOpen((p) => !p)}
        style={{
          display: visible ? "flex" : "none",
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 999,
          background: "#25d366",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 8px 28px rgba(37,211,102,0.45)",
        }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X size={22} color="#fff" />
            </motion.div>
          ) : (
            <motion.div
              key="wa"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
