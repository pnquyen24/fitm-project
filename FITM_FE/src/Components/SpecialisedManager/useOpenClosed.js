import { useCallback, useState } from "react";

function useOpenClosed(initialState = false) {
    const [isOpen, setIsOpen] = useState(initialState);

    const handleOpen = useCallback(() => { setIsOpen(true) }, []);
    const handleClose = useCallback(() => { setIsOpen(false) }, []);
    const handleToggle = useCallback(() => { setIsOpen(state => !state) }, []);

    return {
        isOpen,
        handleOpen,
        handleClose,
        handleToggle
    };
}

export default useOpenClosed;
