import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Context = {
  isErrors: FeedbackProps;
  isSuccesses: FeedbackProps;
  setError: React.Dispatch<React.SetStateAction<FeedbackProps>>;
  setSuccess: React.Dispatch<React.SetStateAction<FeedbackProps>>;
};

type FeedbackProps = {
  type: {
    add: boolean;
    edit: boolean;
    remove: boolean;
  };
  status: boolean;
};

const initialValues: FeedbackProps = {
  type: {
    add: false,
    edit: false,
    remove: false,
  },
  status: false,
};

const FeedbackContext = createContext<Context>({} as never);

export const FeedbackProvider = ({ children }: any) => {
  const [isErrors, setError] = useState<FeedbackProps>(initialValues);
  const [isSuccesses, setSuccess] = useState<FeedbackProps>(initialValues);

  useEffect(() => {
    if (isErrors.status) {
      setTimeout(() => {
        setError({
          ...isErrors,
          type: { add: false, edit: false, remove: false },
          status: false,
        });
      }, 4000);
    }
  }, [isErrors]);

  useEffect(() => {
    if (isSuccesses.status) {
      setTimeout(() => {
        setSuccess({
          ...isSuccesses,
          type: { add: false, edit: false, remove: false },
          status: false,
        });
      }, 4000);
    }
  }, [isSuccesses]);

  return (
    <FeedbackContext.Provider
      value={{
        isErrors,
        isSuccesses,
        setError,
        setSuccess,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedback = () => {
  return useContext(FeedbackContext);
};
