/**
 * Tipos de estado de transacción
 */
export type TransactionStatus = 'SUCCESSFUL' | 'REJECTED';

/**
 * Métodos de pago disponibles
 */
export type PaymentMethod = 'CARD' | 'PSE' | 'DAVIPLATA' | 'NEQUI' | 'BANCOLOMBIA';

/**
 * Tipos de venta
 */
export type SalesType = 'TERMINAL' | 'PAYMENT_LINK';

/**
 * Franquicias de tarjetas
 */
export type CardFranchise = 'VISA' | 'MASTERCARD' | 'AMERICAN_EXPRESS';

/**
 * Interfaz principal de transacción
 */
export interface Transaction {
  id: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  salesType: SalesType;
  createdAt: number; // timestamp
  transactionReference: number;
  amount: number;
  deduction?: number;
  franchise?: CardFranchise;
}

/**
 * Respuesta de la API
 */
export interface TransactionsResponse {
  data: Transaction[];
}

/**
 * Filtros de fecha disponibles
 */
export type DateFilter = 'today' | 'week' | 'october';

/**
 * Filtros de tipo de transacción
 */
export type TransactionTypeFilter = 'terminal' | 'payment_link' | 'all';

/**
 * Estado de los filtros
 */
export interface FilterState {
  dateFilter: DateFilter;
  transactionTypeFilter: TransactionTypeFilter[];
  searchTerm: string;
}

/**
 * Estado del store de filtros
 */
export interface FilterStore {
  filters: FilterState;
  setDateFilter: (filter: DateFilter) => void;
  setTransactionTypeFilter: (filter: TransactionTypeFilter[]) => void;
  setSearchTerm: (term: string) => void;
  resetFilters: () => void;
}

/**
 * Estado de carga y error para la API
 */
export interface ApiState {
  loading: boolean;
  error: string | null;
}

/**
 * Estado de transacciones
 */
export interface TransactionState {
  transactions: Transaction[];
  filteredTransactions: Transaction[];
  totalAmount: number;
  loading: boolean;
  error: string | null;
}

/**
 * Configuración de la tabla
 */
export interface TableConfig {
  columns: TableColumn[];
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
}

/**
 * Configuración de columna
 */
export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
}

/**
 * Opciones de filtro de fecha
 */
export interface DateFilterOption {
  value: DateFilter;
  label: string;
  description: string;
}

/**
 * Opciones de filtro de tipo de transacción
 */
export interface TransactionTypeFilterOption {
  value: TransactionTypeFilter;
  label: string;
  description: string;
}

/**
 * Estadísticas de transacciones
 */
export interface TransactionStats {
  totalAmount: number;
  totalTransactions: number;
  successfulTransactions: number;
  rejectedTransactions: number;
  averageAmount: number;
}

/**
 * Configuración del modal
 */
export interface ModalConfig {
  isOpen: boolean;
  transaction?: Transaction;
  animation?: 'slide' | 'fade' | 'scale';
}

/**
 * Configuración de la búsqueda
 */
export interface SearchConfig {
  placeholder: string;
  debounceTime: number;
  minLength: number;
}

/**
 * Configuración de paginación
 */
export interface PaginationConfig {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

/**
 * Configuración de la aplicación
 */
export interface AppConfig {
  apiUrl: string;
  pageSize: number;
  debounceTime: number;
  animationDuration: number;
}
