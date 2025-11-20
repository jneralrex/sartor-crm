import { Check, TimerIcon, Trash, X } from "lucide-react";
import { useEffect, useState } from "react";
import instance from "../../../utils/axiosInstance";
import { useUserId } from "../../../store/authStore";
import { toast } from "react-toastify";

const SingleNotificationView = ({ id, onClose }) => {
    const [notification, setNotification] = useState(null);
    const [loading, setLoading] = useState(true);
    const userId = useUserId();

    const fetchSingleNotification = async () => {
        try {
            const res = await instance.get(`notification/${id}`, {
                user: userId
            });

            setNotification(res.data.data);
            toast.success("Notification loaded");
        } catch (err) {
            console.log("Fetch error:", err);
            toast.error("Failed to load notification");
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async () => {
        try {
            await instance.put(`notification/read/${id}`, {
                user: userId
            });

            setNotification((prev) => ({
                ...prev,
                status: true,
                readDateTime: Date.now()
            }));

            toast.success("Marked as read");
        } catch (err) {
            console.log("Mark as read error:", err);
            toast.error("Failed to mark as read");
        }
    };

    const deleteNotification = async () => {
        try {
            await instance.delete(`notification/delete/${id}`, {
                data: { user: userId }
            });

            toast.success("Notification deleted");
            onClose();
        } catch (err) {
            console.log("Delete error:", err);
            toast.error("Failed to delete");
        }
    };

    useEffect(() => {
        if (id && userId) fetchSingleNotification();
    }, [id, userId]);

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-[99] px-4">
            <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-md">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-[#1A1A1A]">Notification</h2>
                    <button onClick={onClose}>
                        <X className="size-5" />
                    </button>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading...</p>
                ) : !notification ? (
                    <p className="text-center text-gray-500">Notification not found.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        {/* Time */}
                        <div className="flex gap-2 text-[#858D9D] text-sm items-center">
                            <TimerIcon className="size-4" />
                            <span>{new Date(notification.creationDateTime).toLocaleString()}</span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-semibold text-[#333843]">
                            {notification.notification}
                        </h3>

                        {/* Description or body (if any) */}
                        {notification.body && (
                            <p className="text-gray-600 text-[15px] leading-6">
                                {notification.body}
                            </p>
                        )}

                        {/* Type */}
                        <p className="text-sm text-[#858D9D]">
                            <strong>Type:</strong>{" "}
                            {["Order", "Product", "Task", "Lead", "LPO"][notification.type]}
                        </p>

                        {/* Status */}
                        {notification.status ? (
                            <p className="text-green-600 text-sm">
                                ✔ Read on {new Date(notification.readDateTime).toLocaleString()}
                            </p>
                        ) : (
                            <p className="text-red-500 text-sm">Not read</p>
                        )}

                        {/* Actions */}
                        <div className="flex justify-between mt-4">
                            {!notification.status && (
                                <button
                                    onClick={markAsRead}
                                    className="flex items-center gap-1 text-primary_blue underline"
                                >
                                    <Check className="size-4" /> Mark as Read
                                </button>
                            )}

                            <button
                                onClick={deleteNotification}
                                className="text-red-500 flex items-center gap-1"
                            >
                                <Trash className="size-4" /> Delete
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SingleNotificationView;
