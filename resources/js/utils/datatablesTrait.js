import {onMounted, reactive, watch} from "vue";
import Debounce from "./Debounce.js";

export function useDataTables(fetchRecords, orderColumnDefault = 'created_at', pageLengthDefault = 5, directionAscDefault = true) {
    const orderAsc = reactive({value: directionAscDefault})
    const orderColumn = reactive({value: orderColumnDefault});
    const pageLength = reactive({value: pageLengthDefault});
    const search = reactive({value: null});

    onMounted(() => {
        fetchRecords();
    });

    function orderBy(column) {
        if (orderColumn.value === column) {
            orderAsc.value = !orderAsc.value;
        } else {
            orderColumn.value = column;
            orderAsc.value = true;
        }
        fetchRecords();
    }

    watch(search, Debounce(() => {
        fetchRecords();
    }, 500));

    watch(pageLength, () => fetchRecords());

    return {
        fetchRecords,
        orderAsc,
        orderBy,
        orderColumn,
        pageLength,
        search,
    };
}