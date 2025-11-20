import { Check, TimerIcon, X, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import instance from "../../../utils/axiosInstance";
import { useUserId } from "../../../store/authStore";
import { toast } from "react-toastify";
import SingleNotificationView from "./SingleNotificationView";

const NotificationModal = ({ onClose }) => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const userId = useUserId();
    const [selectedId, setSelectedId] = useState(null);

    // Format time difference
    const timeAgo = (timestamp) => {
        if (!timestamp) return "N/A";
        const diff = Date.now() - timestamp;
        const sec = Math.floor(diff / 1000);

        if (sec < 60) return `${sec}s ago`;
        const min = Math.floor(sec / 60);
        if (min < 60) return `${min}m ago`;
        const hrs = Math.floor(min / 60);
        if (hrs < 24) return `${hrs}h ago`;
        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    };

    // Fetch notifications
    const fetchNotifications = async () => {
        try {
            const res = await instance.get(
                `notifications?limit=20`,
                { user: userId }
            );
            setNotifications(res.data.data.data);
            toast.success("Notifications updated");
        } catch (err) {
            console.log("Fetch error:", err);
            toast.error("Failed to load notifications");
        } finally {
            setLoading(false);
        }
    };

    // Mark notification as read
    const markAsRead = async (id) => {
        try {
            const res = await instance.put(`notification/read/${id}`, {
                user: userId
            });

            console.log(res);

            setNotifications((prev) =>
                prev.map((n) =>
                    n._id === id
                        ? { ...n, status: true, readDateTime: Date.now() }
                        : n
                )
            );

            toast.success(res.data.message);
        } catch (err) {
            console.log("Mark as read error:", err);
            toast.error(err.response.data.message || err.message);
        }
    };

    // Delete notification
    const deleteNotification = async (id) => {
        try {
            const res = await instance.delete(`notification/delete/${id}`, {
                data: { user: userId }
            });

            console.log(res)

            setNotifications((prev) => prev.filter((n) => n._id !== id));

            toast.success(res.data.message);
        } catch (err) {
            console.log("Delete error:", err);
            toast.error(err.response.data.message || err.message);
        }
    };




    useEffect(() => {
        if (userId) fetchNotifications();
    }, [userId]);

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[99] md:justify-end">
            <div className="bg-primary_white p-6 shadow-lg max-w-[455px] h-[550px] md:h-[400px] rounded-xl overflow-y-scroll hide-scrollbar">

                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Notifications</h2>
                    <button onClick={onClose}><X /></button>
                </div>

                {loading ? (
                    <p className="mt-5 text-center text-gray-500">Loading...</p>
                ) : (
                    <div className="w-full flex flex-col gap-6 mt-4">
                        {notifications.map((item) => (
                            <div key={item._id} className="flex flex-col gap-2 border-b pb-4 cursor-pointer" onClick={() => setSelectedId(item._id)}>

                                {/* Time */}
                                <div className="flex gap-2 text-[#858D9D] text-[12px] items-center">
                                    <TimerIcon className="size-4" />
                                    <span>{timeAgo(item.creationDateTime)}</span>
                                </div>

                                {/* Notification Title */}
                                <span className="text-[#333843] font-medium text-[16px]">
                                    {item.notification}
                                </span>

                                {/* Created Date */}
                                <p className="text-[13px] text-gray-500">
                                    Created: {new Date(item.creationDateTime).toLocaleString()}
                                </p>

                                {/* Read info */}
                                {item.status && (
                                    <p className="text-[13px] text-green-600">
                                        Read: {new Date(item.readDateTime).toLocaleString()}
                                    </p>
                                )}

                                {/* Type */}
                                <p className="font-normal text-[14px] text-[#858D9D] capitalize">
                                    Type: {["Order", "Product", "Task", "Lead", "LPO"][item.type]}
                                </p>

                                {/* Action Buttons */}
                                <div className="w-full flex justify-between items-center">
                                    {!item.status && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                markAsRead(item._id);
                                            }}
                                            className="flex items-center gap-1 text-primary_blue underline"
                                        >

                                            <Check className="size-4" /> Mark as Read
                                        </button>
                                    )}

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteNotification(item._id);
                                        }}
                                        className="text-red-500 flex items-center gap-1"
                                    >

                                        <Trash className="size-4" /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}

                        {notifications.length === 0 && (
                            <p className="text-center text-gray-500">No notifications found.</p>
                        )}
                    </div>
                )}

            </div>
            {selectedId && (
                <SingleNotificationView
                    id={selectedId}
                    onClose={() => setSelectedId(null)}
                />
            )}

        </div>
    );
};

export default NotificationModal;
