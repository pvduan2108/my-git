package com.nt.rookie.post.util;

import java.util.HashMap;
import java.util.Map;

public enum AssignmentState {
        WAITING_FOR_ACCEPTANCE (0),
        ACCEPTED (1),
        WAITING_FOR_RETURNING (2),
        COMPLETED (3),
        DECLINED(4);
        private final int value;
        AssignmentState(int i) {
            this.value = i;
        }
        private static final Map<Integer,AssignmentState> map = new HashMap<>();
        static {
            for (AssignmentState e : values()) {
                map.put(e.value,e);
            }
        }
        public static AssignmentState valueOf(int i) {
            return map.get(i);
        }
        public int getValue() {
        return value;
        }
}
