import React, { useEffect, useState } from "react";
import useTaskContext from "../../hooks/useTaskContext";

function HeadUnit() {
  const { activeGroupTasks, process_count } = useTaskContext();
  const [completed, setCompleted] = useState(0);
  const [stats, setStats] = useState(
    "Masih belum ada Tugas, silahkan buat tugas baru dengan Prompt."
  );

  useEffect(() => {
    if (activeGroupTasks?.length > 0) {
      setCompleted(
        activeGroupTasks.filter((task) => task.done === true)?.length
      );
    }
  }, [activeGroupTasks, process_count]);

  useEffect(() => {
    if (activeGroupTasks?.length > 0) {
      if (completed < 1) {
        setStats(
          `Belum ada satupun tugas yang selesai dari total ${activeGroupTasks.length} tugas yang ada.`
        );
      } else if (completed > 0) {
        if (completed === activeGroupTasks.length) {
          setStats(
            `Keren, dari total ${activeGroupTasks.length} tugas kamu berhasil menyelesaikan semuanya.`
          );
        } else {
          setStats(
            `Bagus, ${completed} tugas selesai sisa ${
              activeGroupTasks.length - completed
            } tugas lagi.`
          );
        }
      }
    } else {
      setStats(
        `Masih belum ada Tugas, silahkan buat tugas baru dengan Prompt.`
      );
    }
  }, [activeGroupTasks, process_count, completed]);

  return (
    <div className="bg-secondary p-4 rounded-xl flex justify-between gap-2">
      <div>
        <h1 className="poppins-bold text-2xl leading-4 mb-2">STATISTIK</h1>
        <p className="quicksand-regular leading-4">{stats}</p>
      </div>
      <div>
        <div className="min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] bg-quinary rounded-full flex items-center justify-center">
          {activeGroupTasks?.length > 0 ? (
            <span className="oswald-regular text-4xl text-primary">
              {completed}/{activeGroupTasks?.length}
            </span>
          ) : (
            <span className="oswald-regular text-xl text-primary">KOSONG</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeadUnit;
