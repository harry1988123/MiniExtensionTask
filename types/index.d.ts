export interface RootState {
  /**
   * State of Form COmponent
   */
  form: FormState;
  /**
   * State of App Component
   */
  app: AppState;
}

export interface AppProps {}

export type AppState = {
  /**
   * Error Message
   * @description Message displayed to the user in case of an error while fetching the data
   */
  error: string;
  /**
   * Loading Flag
   */
  loading: boolean;
  /**
   * Student's name
   */
  user: string;
  /**
   * Logged In / Out Flag
   */
  loggedIn: boolean;
  /**
   * Student's Data
   */
  data: ClassesProps['data'];
};

export interface FormProps {
  /**
   * Submit Callback
   */
  onSubmit(value: string): void;
  /**
   * Error Message
   */
  error: string;
}

export interface FormState {
  /**
   * Form's Value
   */
  value: string;
}

export interface ClassRecord {
  /**
   * Class's Name
   */
  Name: string;
  /**
   * Class's Linked Students
   */
  Students: string[];
}

export interface ClassesProps {
  /**
   * Student's Data
   */
  //  returned from the view with the class's record ID as
  data: {
    [key: string]: ClassRecord;
  };
  /**
   * Logout Function
   */
  handleLogout(): void;
}
